const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
//const saltRounds = 10;

// const validatePassword = (password, dbpassword) => {
//   bcrypt.compareSync(password, dbpassword);
//   return true;
// };

function generateAccessToken(username) {
  return jwt.sign(customername, process.env.TOKEN_SECRET, {
    expiresIn: "1800h",
  });
}

exports.addcustomer = async (req, res) => {
  const {
    customerId,
    first_name,
    last_name,
    //password,
    customer_email,
    mobile_no,
    sortorder,
    status,
  } = req.body;

  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hashpassword = bcrypt.hashSync(password, salt);

  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }

  const newCustomer = new Customer({
    customerId: random_string,
    first_name: first_name,
    last_name : last_name,
   // password: hashpassword,
    customer_email: customer_email,
    mobile_no: mobile_no,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Customer.findOne({ mobile_no: mobile_no });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newCustomer
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.login = async (req, res) => {
  const { customer_email, password } = req.body;

  // Find user with requested email
  Customer.findOne({ customer_email: customer_email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      // console.log(process.env.TOKEN_SECRET);
      if (validatePassword(password, user.password)) {
        const token = jwt.sign({ customerId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "365d",
        });

        return res.status(201).send({
          message: "User Logged In",
          token: token,
          user: user,
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
};

exports.editcustomer = async (req, res) => {
  const findandUpdateEntry = await Customer.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );

  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      status: "error",
      error: "error",
    });
  }
};

exports.allcustomer = async (req, res) => {
  const findall = await Customer.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getonecustomer = async (req, res) => {
  const findone = await Customer.findOne({ _id: req.params.id });
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.delcustomer = async (req, res) => {
  try {
    const deleteentry = await Customer.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};


exports.totalcustomer = async(req,res) =>{
  await Customer.countDocuments().then((data)=>{
    res.status(200).json({
      status: true,
      data: data,
    });
  })
  .catch((error) => {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  })
}



const defaultotp = 1234;
exports.sendotp = async (req, res) => {
  const { mobile_no } = req.body;
  const finddetails  = await Customer.findOne({mobile_no : mobile_no})
  //console.log(mobile_no.length);
  if (finddetails) {
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      mobile: mobile_no,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error occured",
    });
  }
};

// // const mailer = (email,otp) =>{
// // const nodemailer = require("nodemailer");
// // var smtptransporter = nodemailer.createTransport({
// //   service: "gmail",

// //   auth: {
// //     user: "98710priya@gmail.com",
// //     pass: "INSTAFB00123",
// //   },
// // });
// // var mailOptions = {
// //   from: "98710priya@gmail.com",
// //   to: "guptapratima98710@gmail.com",
// //   subject: "Sending mail using node js",
// //   text: "hii",
// // };

// smtptransporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     //console.log(error);
//   } else {
//     // console.log("Email.sent" + info.response);
//   }
//   smtptransporter.close();
// });
// }


exports.emailSend = async (req, res) => {
  //console.log(req.body.customer_email);
  let data = await Customer.findOne({ customer_email: req.body.customer_email });
  //console.log(data);
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    //console.log(data + "if");
    let otpData = new Customer({
      customer_email: req.body.customer_email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    responseType.statusText = "success";
    responseType.message = "please check your email Id";
    responseType.data = otpData;
  } else {
    //console.log(data + "else");
    responseType.statusText = "error";
    responseType.message = "email Id not exist";
  }
  res.status(200).json(responseType);
};

 
exports.verifyotp = async (req, res) => {
  const { mobile_no, otp } = req.body;

  if (otp == 1234) {
    const findone = await Customer.findOne({ mobile_no: mobile_no });
    if (findone) {
      res.status(200).json({
        status: true,
        msg: "user already exist",
        alreadyexist: true,
        mobile: mobile_no,
        otp: defaultotp,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "otp verified please register",
        alreadyexist: false,
        mobile: mobile_no,
        otp: defaultotp,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Incorrect otp",
    });
  }
};

// exports.changePassword = async (req,res) =>{
//   let data = await Customer.findOne({customer_email : req.body.customer_email,code : req.body.otpCode})
// const response = {}
// if(data) {
//   let currentTime = new Date().getTime()
//   let diff = data.expireIn - currentTime
//   if(diff){
//     response.message = "Token Expire",
//     response.statusText ="errro"
//   }else {
//     let customer = await Customer.findOne({})
//   }
// }    
// }

