const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { sendmail } = require("./mail");

const router = require("../routes/mail");

// const validatePassword = (password, dbpassword) => {
//   bcrypt.compareSync(password, dbpassword);
//   return true;
// };

// function generateAccessToken(username) {
//   return jwt.sign(customername, process.env.TOKEN_SECRET, {
//     expiresIn: "1800h",
//   });
// }

exports.signup = async (req, res) => {
  const { customerId, firstname, lastname, email, mobile, password } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

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
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobile: mobile,
    password: hashpassword,
  });

  const findexist = await Customer.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newCustomer
      .save()
      .then((result) => {
        const token = jwt.sign(
          {
            userId: result._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        );
        res.header("auth-token", token).status(200).json({
          status: true,
          token: token,
          msg: "success",
          user: result,
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

// exports.login = async (req, res) => {
//   const { email,mobile, password } = req.body;

//   // Find user with requested email
//   Customer.findOne({ $or : [{email: email },{mobile:mobile}]}), function (err, user) {
//     if (user === null) {
//       return res.status(400).send({
//         message: "User not found.",
//       });
//     } else {
//       // console.log(process.env.TOKEN_SECRET);
//       if (validatePassword(password, user.password)) {
//         const token = jwt.sign({ userId: user._id }
//           , process.env.TOKEN_SECRET, {
//           expiresIn: "86400000",
//         }
//         );

//         return res.status(201).send({
//           message: "User Logged In",
//           token: token,
//           user: user,
//         });
//       } else {
//         return res.status(400).send({
//           message: "Wrong Password",
//         });
//       }
//   }
// }
//   }

exports.login = async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await Customer.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400000,
        }
      );
      res.header("auth-token", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        user: user,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "Incorrect Password",
        error: "error",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "User Doesnot Exist",
      error: "error",
    });
  }
};

exports.editcustomer = async (req, res) => {
  const findandUpdateEntry = await Customer.findOneAndUpdate(
    {
      customer : req.userId,
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

exports.totalcustomer = async (req, res) => {
  await Customer.countDocuments()
    .then((data) => {
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
    });
};

exports.sendotp = async (req, res) => {
  const defaultotp = Math.ceil(100000 + Math.random() * 900000);
  const { customer_email } = req.body;
  const finddetails = await Customer.findOneAndUpdate(
    { customer_email: customer_email },
    { $set: { otp: defaultotp } },
    { new: true }
  );

  //console.log(mobile_no.length);
  //console.log(finddetails);
  //console.log(finddetails.customer_email);
  if (finddetails) {
    //   //const {to,text,} = req.body
    //   const subject = `Buynaa Email Verification`;
    //   const text = `<h4>Your verfication code is ${defaultotp}</h4>`;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "smtpout.secureserver.net",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "support@buynaa.com", // generated ethereal user
    //     pass: "Buynaa330*", // generated ethereal password
    //   },
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: '"Buynaa Support" <support@buynaa.com>', // sender address
    //   to: finddetails.customer_email, // list of receivers
    //   subject: subject, // Subject line
    //   text: text, // plain text body
    //   html: `<b>${text}</b>`, // html body
    // })

    // console.log("Message sent: %s", info);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      email: customer_email,
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
  let data = await Customer.findOne({
    customer_email: req.body.customer_email,
  });
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
  const { customer_email, otp } = req.body;

  const findone = await Customer.findOne({
    $and: [{ customer_email: customer_email }, { otp: otp }],
  });

  //.then((data)=>{
  //     res.status(200).json({
  //       //status: true,
  //       msg: "otp verified",
  //       data: data,
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(400).json({
  //      // status: false,
  //       msg: "Incorrect Otp",
  //       error: error,
  //     });
  //   })
  // }

  if (findone) {
    res.status(200).json({
      status: true,
      msg: "otp verified",
      data: findone,
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "Incorrect Otp",
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

// exports.login = async (req, res) => {
//   const { customer_email, password } = req.body;

//   const finddetails = await Customer.findOne({
//     $or: [{ Mobile: Mobile }, { ConfirmEmail: Email }],
//   });
//   if (finddetails) {
//     const validPass = await bcrypt.compare(
//       password,
//       finddetails.ConfirmPassword
//     );
//     // if (validPass) {
//     //   const token = jwt.sign(
//     //     {
//     //       staffId: finddetails._id,
//     //     },
//     //     key,
//     //     {
//     //       expiresIn: 86400000,
//     //     }
//     //   );
//     //   res.header("auth-adtoken", token).status(200).send({
//     //     status: true,
//     //     token: token,
//     //     msg: "success",
//     //     user: finddetails,
//     //     user_type: "user",
//     //   });
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "Incorrect Password",
//         error: "error",
//       });
//     }
//   // else {
//   //   res.status(400).json({
//   //     status: false,
//   //     msg: "User Doesnot Exist",
//   //     error: "error",
//   //   });
//   // }
// }
