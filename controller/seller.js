const Seller = require("../models/seller");
const Role = require("../models/role");
const nodemailer = require("nodemailer");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const role = require("../models/role");

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
    rolename,
    role,
    hasSubscribed,
    //createdby,
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
    rolename: rolename,
    hasSubscribed: hasSubscribed,
    // razorpay_payment_id: razorpay_payment_id,
    //role: role,
    //createdby: createdby,
  });

  const newRole = new Role({
    dashboard: true,
    store: true,
    addMyStore: true,
    storeList: true,
    contacts: true,
    addEmployee: true,
    employeeList: true,
    addCustomer: true,
    customerList: true,
    addSupplier: true,
    supplierList: true,
    inventory: true,
    products: true,
    AddMyProduct: true,
    productsList: true,
    stockControl: true,
    stockTransferRequest: true,
    stockAdjustment: true,
    coupons: true,
    subscription: true,
    choosePaymentOption: true,
    subsList: true,
    billing: true,
    order: true,
    purchase: true,
    newPurchaseOrder: true,
    purchaseOrderList: true,
    purchaseInvoiceList: true,
    reports: true,
    rolesPermission: true,
    roleList: true,
    addRole: true,
    setting: true,
    brandList: true,
    taxList: true,
    unitList: true,
    reasonList: true,
    colourList: true,
    sizeList: true,
    productCategory: true,
    material: true,
    warehouseList: true,
  });

  //const makeroles = await Role.create(newRole)
  //console.log("Roles",makeroles)
  //newSeller.role = makeroles._id

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
      .then(async (result) => {
        newRole.emp = result._id;
        let makeroles = await Role.create(newRole);
        console.log(makeroles);

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
          role :makeroles
          //designation: "seller",
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

exports.addemployee = async (req, res) => {
  const {
    name,
    email,
    mobile,
    password,
    cnfrm_password,
    image,
    rolename,
    added_by,
    hasSubscribed,
    role
  } = req.body;

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
let Subscribed= false
let sel= await Seller.findOne({sellerId:added_by})
console.log(sel)
if (sel)
{
   Subscribed = sel.hasSubscribed
   console.log("seller",Subscribed)
}
  const newSeller = new Seller({
    name: name,
    email: email,
    mobile: mobile,
    password: hashPassword,
    cnfrm_password: hashPassword,
    image: image,
    rolename: rolename,
    role : role,
    added_by: req.sellerId,
    hasSubscribed:Subscribed
  });

  if (req.file) {
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSeller.image = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }

  const emailexist = await Seller.findOne({ email: email });
  const numberexist = await Seller.findOne({ mobile: mobile });
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
    newSeller
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

exports.getemployecreatedbyseller = async (req, res) => {
  const findall = await Seller.find({ added_by: req.sellerId })
    // .populate("role")
    .populate("added_by")
    .populate("role")
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

exports.getseller = async (req, res) => {
  const findall = await Seller.find().sort({
    sortorder: -1,
  }).populate("role");
  //.populate("role");
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
exports.getoneempcreatedbyseller = async (req, res) => {
  const findone = await Seller.findOne({
    $and: [{ id: req.sellerId }, { _id: req.params.id }],
  })
    //.populate("role")
    .populate("added_by")
    .populate("role");

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

// seller by token

exports.getoneseller = async (req, res) => {
  const findone = await Seller.findOne({ _id: req.sellerId }).populate("role");
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

//admin
exports.viewoneseller = async (req, res) => {
  const findone = await Seller.findOne({ _id: req.params.id });
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

exports.sellerlogin = async (req, res) => {
  const { mobile, email, password,role } = req.body;
  const user = await Seller.findOne({
    $or: [{ mobile: mobile }, { email: email }],
  }).populate("role")
  // .populate({
  //   path: "role",
  //   populate: {
  //     path: "addemp",
  //   },
  // })
  .populate("added_by")
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
        role:role
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

// exports.editseller = async (req, res) => {
//   const findandUpdateEntry = await Seller.findOneAndUpdate(
//     {
//       _id: req.sellerId,
//     },
//     { $set: req.body },
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

exports.editempByseller = async (req, res) => {
  const { name, email, mobile, rolename } = req.body;

  data = {};
  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  // if (password) {
  //   data.password = password;
  // }
  // if(cnfrm_password){
  //   data.cnfrm_password = cnfrm_password
  // }
  if (rolename) {
    data.rolename = rolename;
  }

  //console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.image = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data);
  if (data) {
    const findandUpdateEntry = await Seller.findOneAndUpdate(
      {
        $and: [{ added_by: req.sellerId }, { _id: req.params.id }],
      },
      { $set: data },
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
  }
};

exports.editseller = async (req, res) => {
  const { name, email, mobile, rolename, image,hasSubscribed } = req.body;

  data = {};
  if (name) {
    data.name = name;
  }
  if (email) {
    data.email = email;
  }
  if (mobile) {
    data.mobile = mobile;
  }
  if (hasSubscribed) {
    data.hasSubscribed = hasSubscribed;
  }
  // if (password) {
  //   data.password = password;
  // }
  // if(cnfrm_password){
  //   data.cnfrm_password = cnfrm_password
  // }
  if (rolename) {
    data.rolename = rolename;
  }
  //  console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.image = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data);
  if (data) {
     const findandUpdateEntry = await Seller.findOneAndUpdate(
      {
        _id: req.sellerId,
      },
      { $set: data },
      { new: true }
    );
//console.log(findandUpdateEntry)
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

exports.totalempbyseller = async (req, res) => {
  await Seller.countDocuments({ added_by: req.sellerId })
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
  const { mobile,email } = req.body;
  const http = require("https");
  // const finddetails = await Seller.findOneAndUpdate(
  //   { mobile: mobile },
  //   { $set: { otp: defaultotp } },
  //   { new: true }
  // );

  //console.log(mobile_no.length);
  //console.log(finddetails);
  //console.log(finddetails.email);
  // if (finddetails) {
 
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
    const finddetails = await Seller.findOneAndUpdate(
      {
        $or: [{ mobile: mobile }, { email: email }],
      },
      { $set: { otp: defaultotp } },
      { new: true }
    );
           if(finddetails){
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
  const { mobile, otp } = req.body;

  const findone = await Seller.findOne({ mobile: mobile });

  if (findone) {
    const token = jwt.sign(
      {
        sellerId: findone._id,
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

// exports.forgetpassword = async (req, res) => {
//   const { password, cnfrm_password } = req.body;

//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hashpassword = bcrypt.hashSync(password, salt)

//   const user = await Seller.findOneAndUpdate({
//     $and: [{ password: password }, { cnfrm_password: cnfrm_password }],
//   });
//   if (user) {
//     // console.log(user)
//     const validPass = await bcrypt.compare(password, user.cnfrm_password);
//     if (validPass) {
// const findandUpdateEntry = await Seller.findOneAndUpdate(
//   {
//     _id: req.sellerId,
//   },

//   { $set: { password: req.body } },
//         { new: true }
// )
// if(findandUpdateEntry){
//   console.log(findandUpdateEntry)
//   res.status(400).json({
//     status: true,
//     msg: "Password  Changed Successfully",
//     user: user,
//   });
// } else {
//   res.status(200).json({
//     status: false,
//     msg: "Password Not Matched",
//   });
// }
//     }}}



    exports.fogetpassword = async (req, res) => {

      const {password,cnfrm_password} = req.body

      //  const salt = await bcrypt.genSalt(10);
      //  const hashPassword = await bcrypt.hash(password, salt);
      //  const hashPassword1 = await bcrypt.hash(cnfrmPassword, salt)

        // const validPass = String.compare(req.body.password, req.body.cnfrmPassword);
        // console.log("Result",validPass)
        if(password === cnfrm_password){

        
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const findandUpdateEntry = await Seller.findOneAndUpdate(
        {
      _id: req.sellerId
        },
        { $set: { password: hashPassword ,cnfrm_password:hashPassword} },
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
//       res.status(400).json({
//         status: true,
//         msg: "Password  Changed Successfully",
//         user: user,
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         msg: "Password Not Matched",
//       });
//     }
//   }
// };

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

//   if (findone) {
//     res.status(200).json({
//       status: true,
//       msg: "Password  Change Successfully",
//       data: findone,
//     });
//   } else {
//     res.status(200).json({
//       status: false,get
//       msg: "Password Not Matched",
//     });
//   }
// };
 

 