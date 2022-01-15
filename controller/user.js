const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
}

exports.adduser = async (req, res) => {
  const {
    //UserID,
    username,
    user_email,
    mobile_no,
    userImage,
    country,
    state,
    city,
    password,
    role,
    sortorder,
    status,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);
  const token = generateAccessToken({ username: username });
  const newUser = new User({
    //UserID: UserID,
    username: username,
    user_email: user_email,
    userImage: userImage,
    mobile_no: mobile_no,
    country: country,
    state: state,
    city: city,
    password: hashpassword,
    role: role,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await User.findOne({ mobile_no: mobile_no });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newUser.userImage = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newUser
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
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  } else {
    const findexist = await User.findOne({ mobile_no: mobile_no });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newUser
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: " success",
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
  }
};

exports.edit_store = async (req, res) => {
  const {
    username,
    user_email,
    mobile_no,
    password,
    role,
    country,
    state,
    city,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (username) {
    data.username = username;
  }
  if (user_email) {
    data.user_email = user_email;
  }
  if (mobile_no) {
    data.mobile_no = mobile_no;
  }
  if (password) {
    data.password = password;
  }
  if (role) {
    data.role = role;
  }

  if (country) {
    data.country = country;
  }
  if (state) {
    data.state = state;
  }
  if (city) {
    data.city = city;
  }

  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  //console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.userImage = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data);
  if (data) {
    const findandUpdateEntry = await User.findOneAndUpdate(
      {
        _id: req.params.id,
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

// exports.login = async (req, res) => {
//   const { mobile_no, password } = req.body;

//   // Find user with requested email
//   User.findOne({ mobile_no: mobile_no }, function (err, user) {
//     if (user === null) {
//       return res.status(400).send({
//         message: "User not found.",
//       });
//     } else {
//       console.log(process.env.TOKEN_SECRET);
//       if (validatePassword(password, user.password)) {
//         const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
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

exports.alluser = async (req, res) => {
  const findall = await User.find().sort({ sortorder: 1 });
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

exports.deleteuser = async (req, res) => {
  try {
    const deleteentry = await User.deleteOne({ _id: req.params.id });
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

const defaultotp = 1234;
exports.sendotp = async (req, res) => {
  const { mobile_no } = req.body;
  if (mobile_no) {
    res.status(200).json({
      status: true,
      msg: "otp send successfully",
      mobile: mobile_no,
      otp: defaultotp,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "please send mobile number",
    });
  }
};

exports.verifyotp = async (req, res) => {
  const { mobile_no, otp } = req.body;
  if (otp == 1234) {
    const findone = await User.findOne({ mobile_no: mobile_no });
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
        msg: "otp verified please register ",
        alreadyexist: false,
        mobile: mobile_no,
        otp: defaultotp,
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Incorrect Otp",
    });
  }
};

 
