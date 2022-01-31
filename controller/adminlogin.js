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
// exports.adminlogin = async (req, res) => {
//     const {mobile,password } = req.body;

//     // Find user with requested phone no.
//     Adminlogin.findOne(
//       {mobile : mobile},
//       function (err, user) {
//         if (user === null) {
//           return res.status(400).send({
//             message: "User not Exist.",
//           });
//         }else {
//           // console.log(process.env.TOKEN_SECRET);
//           if (validatePassword(password, user.password)) {
//             const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
//               expiresIn: "365d",
//             });
//           }

//         else if(true) {
//             res.status(201).send({
//               message: "User Logged In",
//               user: user,
//              // usertype : "Admin"
//             });
//           } else {
//             return res.status(400).send({
//               message: "Wrong Password",
//             });
//           }
//         }
//     );
//   };
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


// exports.adminlogin = async (req, res) => {
  //console.log()
//   const { mobile, password } = req.body;

//   //Find user with requested email
//   Adminlogin.findOne({ mobile: mobile }, function (err, user) {
//     if (user === null) {
//       return res.status(400).send({
//         message: "User not found.",
//       });
//     } else {
//       // console.log(process.env.TOKEN_SECRET);
//       if (validatePassword(password, user.password)) {
//         const token = jwt.sign(
//           { adminId: user._id, mobile: mobile },
//           process.env.TOKEN_SECRET,
//           {
//             expiresIn: "365d",
//           }
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
//     }
//   });
// };

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



 

// exports.adminlogin = async (req, res) => {
//   // console.log(req.body);
//   const { mobile,password } = req.body;

//   const finddetails = await Adminlogin.findOne({ mobile: mobile })
//   if (finddetails) {
//     const validPass = await bcrypt.compare(password, finddetails.password);
//     if (validPass) {
//       const token = jwt.sign(
//         {
//           adminId: finddetails._id,
//         },
//         key,
//         {
//           expiresIn: 86400000,
//         }
//       );
//       res.header("authorization", token).status(200).send({
//         status: true,
//         token: token,
//         msg: "success",
//         user: finddetails,
//       });
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "Incorrect Password",
//         error: "error",
//       });
//     }
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "User Doesnot Exist",
//       error: "error",
//     });
//   }
// };

// exports.setting = async (req, res) => {
//   const updatedChange = await Adminlogin.findOneAndUpdate(
//     { _id: req.userId },
//     { $set: req.body },
//     { new: true }
//   )
//     .then((updateddetails) => {
//       res.json({
//         msg: "changes successful",
//         updateddetails,
//       });
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };
