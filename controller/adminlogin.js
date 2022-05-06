const Adminlogin = require("../models/adminlogin");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(mobile) {
  return jwt.sign(mobile, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
}

exports.createadmin = async (req, res) => {
  const {
    name,
    email,
    mobile,
    phoneno,
    country,
    state,
    city,
    image,
    password,
    cnfmPassword,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(cnfmPassword, salt);
  const token = generateAccessToken({ mobile: mobile });

  const newAdminlogin = new Adminlogin({
    name: name,
    mobile: mobile,
    email : email,
    country: country,
    state: state,
    city: city,
    image: image,
    password: hashpassword,
    cnfmPassword: hashpassword,
  });

  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSeller.image = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }

  newAdminlogin
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
};
 
exports.adminlogin = async (req, res) => {
  const { mobile, email, password } = req.body;
  const admin = await Adminlogin.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (admin) {
    const validPass = await bcrypt.compare(password, admin.cnfmPassword);
    if (validPass) {
      const token = jwt.sign(
        {
          adminId: admin._id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400000,
        }
      );
      res.header("auth-admintoken", token).status(200).send({
        status: true,
        token: token,
        msg: "success",
        user: admin,
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
 
exports.editadmin = async (req, res) => {
  const findandUpdateEntry = await Adminlogin.findOneAndUpdate(
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
      msg: "error",
      error: "error",
    });
  }
};

exports.getoneadmin = async (req, res) => {
  const findone = await Adminlogin.findOne({ _id: req.params.id });
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


exports.adminsendotp = async (req, res) => {
  const defaultotp = Math.ceil(100000 + Math.random() * 900000);
  const { mobile } = req.body;
  const http = require("https");
  
    const options = {
      method: "GET",
      hostname: "api.msg91.com",
      port: null,
      path: `/api/v5/otp?template_id=620deb009f5d151055640942&mobile=91${mobile}&authkey=${process.env.OTPAUTH}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestmain = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    requestmain.end();
    const finddetails = await Adminlogin.findOneAndUpdate(
      { mobile: mobile },
      { $set: { otp: defaultotp } },
      { new: true }
    );
           if(finddetails){
      //const {to,text,} = req.body
      const subject = `Buynaa Email Verification`;
      const text = `<h4>Your verfication code is ${defaultotp}</h4>`;

    //Generate test SMTP service account from ethereal.email
    //Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: "smtpout.secureserver.net",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "support@brizebond.com", // generated ethereal user
    //     pass: "Buynaa@02771", // generated ethereal password
    //   },
    // });

    // // send mail with defined transport object
    // let info = await transporter.sendMail({
    //   from: '"Buynaa Support" <support@buynaa.com>', // sender address
    //   to: finddetails.email, // list of receivers
    //   subject: subject, // Subject line
    //   text: text, // plain text body
    //   html: `<b>${text}</b>`, // html body
    // })

    //  console.log("Message sent: %s", info);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      mobile: mobile,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error occured",
    });
  }
};


exports.adminverifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const findone = await Adminlogin.findOne({ mobile: mobile });

  if (findone) {
    const token = jwt.sign(
      {
        adminId: findone._id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 86400000,
      }
    );
    res.header("auth-adtoken", token).status(200).send({
      status: true,
      token: token,
      msg: "success",
      user: findone,
    });
    const http = require("https");
     

    const options = {
      method: "GET",
      hostname: "api.msg91.com",
      port: null,
      path: `/api/v5/otp/verify?authkey=${process.env.OTPAUTH}&mobile=${mobile}&otp=${otp}`,
      headers: {},
    };

    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    req.end()

    .then((result) => {
      const token = jwt.sign(
        {
          adminId: result._id,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400000,
        }
      );
      res.header("auth-admintoken", token).status(200).json({
        status: true,
        token: token,
        msg: "success",
        user: result,
      });
    })
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


exports.adminfogetpassword = async (req, res) => {

  const {password,cnfmPassword} = req.body

  //  const salt = await bcrypt.genSalt(10);
  //  const hashPassword = await bcrypt.hash(password, salt);
  //  const hashPassword1 = await bcrypt.hash(cnfrmPassword, salt)

    // const validPass = String.compare(req.body.password, req.body.cnfrmPassword);
    // console.log("Result",validPass)
    if(password === cnfmPassword){

    
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const findandUpdateEntry = await Adminlogin.findOneAndUpdate(
    {
  _id: req.adminId
    },
    { $set: { password: hashPassword ,cnfmPassword:hashPassword} },
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
      msg: "error",
      error: "error",
    });
  }
}else{
  res.status(400).json({
    status: false,
    msg: "error",
    error: "Password not matched",
})
}
};



 