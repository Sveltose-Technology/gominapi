const Seller = require("../models/seller");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(seller_name) {
  return jwt.sign(seller_name, process.env.TOKEN_SECRET, {
    expiresIn: "1800h",
  });
}

exports.signup = async (req, res) => {
  const {
    name,
    email,
    mobile,
    password,
    cnfrm_password,
    image,
    designation,
    role,
  } = req.body;

  //hashing password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  // const token = generateAccessToken({ mobile_no: mobile_no });

  const newSeller = new Seller({
    name: name,
    email: email,
    mobile: mobile,
    password: hashpassword,
    cnfrm_password: hashpassword,
    image: image,
    designation: designation,
    role: role,
  });

  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSeller.image = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }

  const findexist = await Seller.findOne({
    $or: [{ email: email }, { mobile: mobile }],
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newSeller
      .save()
      .then((result) => {
        const token = jwt.sign(
          {
            sellerId: result._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        );
        res.header("auth-adtoken", token).status(200).json({
          status: true,
          token: token,
          msg: "success",
          user: result,
          //  user_type: "seller",
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

exports.getseller = async (req, res) => {
  const findall = await Seller.find({ seller: req.sellerId })
    .sort({
      sortorder: 1,
    })
    .populate("role");
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

exports.getoneseller = async (req, res) => {
  const findone = await Seller.findOne({ _id: req.sellerId });
  // .populate(
  //   "role"
  // );
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

// exports.Adminlogin = async (req, res) => {
//   const {email,password } = req.body;

//   // Find user with requested email
//   Seller.findOne(
//     {
//       $or: [

//         { email: email },
//         { password: password },
//       ],
//     },
//     function (err, user) {
//       if (user === null) {
//         return res.status(400).send({
//           message: "User not found.",
//         });
//       } else {
//         if (validatePassword(password, user.password)) {
//           const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
//             expiresIn: "365d",
//           });

//           return res.status(201).send({
//             message: "User Logged In",
//             token: token,
//             user: user,
//             usertype : "Admin"
//           });
//         } else {
//           return res.status(400).send({
//             message: "Wrong Password",
//           });
//         }
//       }
//     }
//   );
// };

// exports.sellerlogin = async (req, res) => {
//   const { email,mobile, password } = req.body;

//   // Find user with requested email
//   Seller.findOne({ email: email }, function (err, user) {
//     if (user === null) {
//       return res.status(400).send({
//         message: "User not found.",
//       });
//     } else {
//       console.log(process.env.TOKEN_SECRET);

//       if (validatePassword(password, user.password)) {
//         const token = jwt.sign({sellerId: user._id }, process.env.TOKEN_SECRET, {
//           expiresIn: "365d",
//         });

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
//     }
//   });
// };

exports.sellerlogin = async (req, res) => {
  const { mobile, email, password } = req.body;
  const user = await Seller.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  });
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const token = jwt.sign(
        {
          sellerId: user._id,
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

exports.editseller = async (req, res) => {
  const findandUpdateEntry = await Seller.findOneAndUpdate(
    {
      _id: req.sellerId,
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

exports.del_seller = async (req, res) => {
  try {
    const deleteentry = await Seller.deleteOne({ _id: req.params.id });
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

// exports.storebyseller = async (req, res) => {
//   const findone = await Seller.find({ store: req.params.id }).sort({
//     sortorder: 1,
//   });
//   if (findone) {
//     res.status(200).json({
//       status: true,
//       msg: " success",
//       data: findone,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: " error",
//     });
//   }
// };

exports.totalseller = async (req, res) => {
  await Seller.countDocuments()
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

exports.sendOtp = async (req, res) => {
  const defaultotp = Math.ceil(100000 + Math.random() * 900000);
  const { email } = req.body;
  const finddetails = await Seller.findOneAndUpdate(
    { email: email },
    { $set: { otp: defaultotp } },
    { new: true }
  );

  //console.log(mobile_no.length);
  //console.log(finddetails);
  //console.log(finddetails.email);
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
      email: email,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error occured",
    });
  }
};

exports.emailsend = async (req, res) => {
  //console.log(req.body.customer_email);
  let data = await Seller.findOne({
    email: req.body.email,
  });
  //console.log(data);
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    //console.log(data + "if");
    let otpData = new Seller({
      email: req.body.email,
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

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const findone = await Seller.findOne({
    $and: [{ email: email }, { otp: otp }],
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

exports.sendOTP = async (req, res) => {
  const defaultotp = Math.ceil(100000 + Math.random() * 900000);
  const { email } = req.body;
  const finddetails = await Seller.findOneAndUpdate(
    { email: email },
    { $set: { otp: defaultotp } },
    { new: true }
  );

  //console.log(mobile_no.length);
  //console.log(finddetails);
  //console.log(finddetails.email);
  if (finddetails) {
    //const {to,text,} = req.body
    const subject = `Buynaa Email Verification`;
    const text = `<h4>Your verfication code is ${defaultotp}</h4>`;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "support@buynaa.com", // generated ethereal user
        pass: "Buynaa330*", // generated ethereal password
      },
    });

    // // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Buynaa Support" <support@buynaa.com>', // sender address
      to: finddetails.email, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: `<b>${text}</b>`, // html body
    });

    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      email: email,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error occured",
    });
  }
};
