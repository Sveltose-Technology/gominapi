const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const { sendmail } = require("./mail");
// const fs = require("fs");
//const filecontent = fs.readFileSync('customer.html')

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
      .then(async (result) => {
        const token = jwt.sign(
          {
            userId: result._id,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: 86400000,
          }
        )

        const subject = `Buynaa Email Verification`;
        // let text = `<h4>Your verfication code is ${defaultotp}</h4>`;
        // let text = customer.html
        // const fs = require("fs");
        // const text = fs.readFileSync('./customer.html');
        // Read HTML Template
        //  let text = fs.readFileSync("customer.htm");
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
          host: "smtpout.secureserver.net",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "support@brizebond.com", // generated ethereal user
            pass: "Buynaa@02771", // generated ethereal password
          },
        });
        const fs = require("fs");
        const text = fs.readFileSync('./customer.html');
        let info = await transporter.sendMail({
          from: '"Buynaa Support" <support@buynaa.com>', // sender address
          to: result.email, // list of receivers
          subject: subject, // Subject line
          //text:  `<b>${text}</b>`, // plain text body
          html: `<b>${text}</b>`, // html body
        })
        console.log("Message sent: %s", info);
        transporter.sendMail(info, function (err, data) {
          if (err) {
            console.log(err)
            console.log('Error Occurs');
          }
          else {
            console.log('Email sent successfully');
            res.send("Email sent successfully")
          }
        });
      })
    // .catch((err) => {
    //   console.log(err)
    //   res.send(err)
    // })
  }
}
//  else {
//     res.send("you are note login")
//   };

//}



// else {
//   res.send("you are note login")
// };

//         res.header("auth-token", token).status(200).json({
//           status: true,
//           token: token,
//           msg: "success",
//           user: result,
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: error,
//         });
//       });
//   }
// };

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
        pass: "Buynaa@02771", // generated ethereal password
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

exports.fogetpassword = async (req, res) => {

  const { password, cnfrmPassword } = req.body

  //  const salt = await bcrypt.genSalt(10);
  //  const hashPassword = await bcrypt.hash(password, salt);
  //  const hashPassword1 = await bcrypt.hash(cnfrmPassword, salt)

  // const validPass = String.compare(req.body.password, req.body.cnfrmPassword);
  // console.log("Result",validPass)
  if (password === cnfrmPassword) {


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const findandUpdateEntry = await Customer.findOneAndUpdate(
      {
        _id: req.userId
      },
      { $set: { password: hashPassword, cnfrmPassword: hashPassword } },
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
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "Password not matched",
    })
  }
};


exports.verifyotp = async (req, res) => {
  const { email, mobile, otp } = req.body;
  const findone = await Customer.findOne({ mobile: mobile });



  if (findone) {

    const token = jwt.sign(
      {
        userId: findone._id,
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