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
  const {
    customerId,
    firstname,
    lastname,
    email,
    mobile,
    password,
    cnfrmPassword,
  } = req.body;

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
    // added_by :req.sellerId,
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobile: mobile,
    password: hashpassword,
    cnfrmPassword: hashpassword,
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

exports.addcustomerbyseller = async (req, res) => {
  const {
    customerId,
    firstname,
    lastname,
    email,
    mobile,
    password,
    cnfrmPassword,
    added_by,
  } = req.body;

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

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
    seller: req.sellerId,
    firstname: firstname,
    lastname: lastname,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfrmPassword: hashPassword,
    added_by: req.sellerId,
  });

  const emailexist = await Customer.findOne({ email: email });
  const numberexist = await Customer.findOne({ mobile: mobile });
  if (emailexist) {
    res.status(400).json({
      status: false,
      msg: "Email Already Exists",
      data: {},
    });
  } else if (numberexist) {
    res.status(400).json({
      status: false,
      msg: " Mobile Already Exists",
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
      _id: req.userId,
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
  const findall = await Customer.find().sort({
    sortorder: 1,
  });
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

exports.Customerbysellerbytoken = async (req, res) => {
  const findall = await Customer.find({ added_by: req.sellerId })
    // .populate("role")
    .populate("added_by")
    .sort({ sortorder: 1 });
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

exports.editcustomerbyseller = async (req, res) => {
  const findandUpdateEntry = await Customer.findOneAndUpdate(
    {
      $and: [{ added_by: req.sellerId }, { _id: req.params.id }],
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

exports.getonecusByseller = async (req, res) => {
  const findone = await Customer.findOne({
    $and: [{ added_by: req.sellerId }, { _id: req.params.id }],
  });
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

exports.getonecustomer = async (req, res) => {
  const findone = await Customer.findOne({ _id: req.userId });
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

exports.viewonecustomer = async (req, res) => {
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

exports.view_onecust = async (req, res) => {
  const findone = await Customer.findOne({ _id: req.params.id });
  //.populate("role");
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

exports.totalcustomerbyseller = async (req, res) => {
  await Customer.countDocuments({ added_by: req.sellerId })
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
  const { email, mobile } = req.body;
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

  //requestmain.write("{\"OTP\":\"6786\"}");
  requestmain.end();

  const finddetails = await Customer.findOneAndUpdate(
    {
      $or: [{ mobile: mobile }, { email: email }],
    },
    { $set: { otp: defaultotp } },
    { new: true }
  );

  //console.log(mobile_no.length);
  //console.log(finddetails);
  //console.log(finddetails.customer_email);
  if (finddetails) {
      //const {to,text,} = req.body
      const subject = `Buynaa Email Verification`;
      const text = `<h4>Your verfication code is ${defaultotp}</h4>`;

    //Generate test SMTP service account from ethereal.email
    //Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "support@brizebond.com", // generated ethereal user
        pass: "Brize91123", // generated ethereal password
      },
    });

    // // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Buynaa Support" <support@buynaa.com>', // sender address
      to: finddetails.email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: `<b>${text}</b>`, // html body
    })

     console.log("Message sent: %s", info);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      email: email,
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

// exports.sendotponMobile = async (req,res) => {
//   const {mobile} = req.body
//   const finddetails = await Customer.findOne({mobile : mobile})

//   const http = require("https");

// const options = {
//   "method": "GET",
//   "hostname": "api.msg91.com",
//   "port": null,
//   "path": "/api/v5/otp?template_id=&mobile=7489651191&authkey=371235Ahasx34S61cc2688P1",
//   "headers": {
//     "Content-Type": "application/json"
//   }
// };

// const req = http.request(options, function (res) {
//   const chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.write("{\"Value1\":\"Param1\",\"Value2\":\"Param2\",\"Value3\":\"Param3\"}");
// req.end();
// }

// exports.sendotpandmail = async (req, res) => {
//   const defaultotp = Math.ceil(100000 + Math.random() * 900000);
//   const { customer_email,mobile } = req.body;
//   const finddetails = await Customer.findOneAndUpdate(
//     { $or: [{ mobile: mobile }, { email: email }]},
//     { $set: { otp: defaultotp } },
//     { new: true }
//   );

//   //console.log(mobile_no.length);
//   //console.log(finddetails);
//   //console.log(finddetails.customer_email);
//   if (finddetails) {
//     //   //const {to,text,} = req.body
//     //   const subject = `Buynaa Email Verification`;
//     //   const text = `<h4>Your verfication code is ${defaultotp}</h4>`;

//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     // let testAccount = await nodemailer.createTestAccount();

//     // // create reusable transporter object using the default SMTP transport
//     // let transporter = nodemailer.createTransport({
//     //   host: "smtpout.secureserver.net",
//     //   port: 587,
//     //   secure: false, // true for 465, false for other ports
//     //   auth: {
//     //     user: "support@buynaa.com", // generated ethereal user
//     //     pass: "Buynaa330*", // generated ethereal password
//     //   },
//     // });

//     // // send mail with defined transport object
//     // let info = await transporter.sendMail({
//     //   from: '"Buynaa Support" <support@buynaa.com>', // sender address
//     //   to: finddetails.customer_email, // list of receivers
//     //   subject: subject, // Subject line
//     //   text: text, // plain text body
//     //   html: `<b>${text}</b>`, // html body
//     // })

//     // console.log("Message sent: %s", info);
//     // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // // Preview only available when sending through an Ethereal account
//     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     res.status(200).json({
//       status: true,
//       msg: "otp send successfully",
//       email: customer_email,
//       otp: defaultotp,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error occured",
//     });
//   }
// };

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
  const { email, mobile, otp } = req.body;

  // const findone = await Customer.findOne({
  //   $and: [{ customer_email: customer_email }, { otp: otp }],
  // });

  const findone = await Customer.findOne({ mobile: mobile });
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

    req.end();

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

exports.changePassword = async (req, res) => {
  let data = await Customer.findOne({
    email: req.body.email,
    code: req.body.otp,
  });
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff) {
      (response.message = "Token Expire"), (response.statusText = "errro");
    } else {
      let customer = await Customer.findOne({ email: req.body.email });
      customer.password = req.body.password;
      customer.save();
      (response.message = "password change"),
        (response.statusText = "success"),
        (response.data = data);
    }
  } else {
    (response.message = "password change"), (response.statusText = "success");
  }
  res.status(200).json(response);
};

exports.resetpassword = async (req, res) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const finddetails = await Customer.findOneAndUpdate(
    { id: req.params.id },
    { $set: { password: hashPassword } },
    { new: true }
  );

  if (finddetails) {
    res.status(200).json({
      status: true,
      msg: "Password Reset Successfull",
      data: finddetails,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

// exports.changepass = async (req, res) => {
//   const {password,} = req.body
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(password, salt);
//   finddetails = await Customer.findOneAndUpdate(
//     { _id: req.userId },
//     $and: [{ password: hashPassword }, { cnfrmPassword :hashPassword }}],
//   //  { $set: { password: hashPassword } },
//     { new: true }
//   )
//   if (finddetails) {
//     res.status(200).json({
//       status: true,
//       msg: "Password Reset Successfull",
//       data: finddetails,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

exports.forgotPassword = async (req, res) => {
  const { password,cnfrmPassword } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  // const findandUpdateEntry = await Customer.findOneAndUpdate(

    // {
    //   _id: req.userId,
    // },
   // { $set: { password: hashpassword } },


  //  custom(async (cnfrmPassword, {req}) => {
  //   const password = req.body.password

    // If password and confirm password not same
    // don't allow to sign up and throw error
    // if(password !== confirmPassword){
    //   throw new Error('Passwords must be same')
    // }

  //})
  

  //  {
  //    $and: [
  //      {_id: req.userId},
  //      { password: password }, 
  //      { cnfrmPassword :cnfrmPassword }]},
  //   { new: true }
  // );

  // if (findandUpdateEntry) {
  //   res.status(200).json({
  //     status: true,
  //     msg: "success",
  //     data: findandUpdateEntry,
  //   });
  // } else {
  //   res.status(400).json({
  //     status: false,
  //     status: "error",
  //     error: "error",
  //   });
  
}

// }




exports.forgetttt = async (req,res) =>{
  const {password} = req.body
  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hashpassword = bcrypt.hashSync(password, salt);

  // const user = await Customer.findOne({ $or: [{ userId: req.userId }, { password: password }], })
  // if(user){
   // console.log(user)
     
  let validPass = await bcrypt.compare(password,cnfrmPassword);
    if(validPass){
      console.log(validPass)
       
      const findandUpdateEntry = await Customer.findOneAndUpdate(
        {
          _id: req.userId,
        },
        { $set: { password: validPass } },
        { new: true }
      
      )
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
    }
  
    // exports.forgotPassword = async (req, res) => {
    //   const { password,cnfrmPassword } = req.body;
    //   const salt = bcrypt.genSaltSync(saltRounds);
    //   const hashpassword = bcrypt.hashSync(password, salt);
    

    //   const findandUpdateEntry = await Customer.findOneAndUpdate(
    //     {
    //       _id: req.userId,
    //     },
    //     // {$and: [{ password: password }, { cnfrmPassword :cnfrmPassword }]},
    //      { $set: { password: hashpassword } },
    //     { new: true }
    //   );
    
    //   if (findandUpdateEntry) {
    //     res.status(200).json({
    //       status: true,
    //       msg: "success",
    //       data: findandUpdateEntry,
    //     });
    //   } else {
    //     res.status(400).json({
    //       status: false,
    //       status: "error",
    //       error: "error",
    //     });
    //   }
    // };
    //CONSOLE