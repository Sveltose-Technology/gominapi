const Seller = require("../models/seller");
// const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");
// const fs = require("fs");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const saltRounds = 10;

const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

// function generateAccessToken(seller_name) {
//   return jwt.sign(seller_name, process.env.TOKEN_SECRET, {
//     expiresIn: "1800h",
//   });
// }

exports.add_seller = async (req, res) => {
  const {
    seller_name,
    seller_email,
    password,
    confirm_password,
    status,
    sortorder,
  } = req.body;
  //console.log(req.body);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  // const token = generateAccessToken({ mobile_no: mobile_no });

  const newSeller = new Seller({
    seller_name: seller_name,
    seller_email: seller_email,
    password: hashpassword,
    confirm_password: hashpassword,
    status: status,
    sortorder: sortorder,
  });

  //console.log(req.body)
  const findexist = await Seller.findOne({ seller_email: seller_email });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
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
exports.getseller = async (req, res) => {
  const findall = await Seller.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getoneseller = async (req, res) => {
  const findone = await Seller.findOne({ _id: req.params.id });
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

exports.login = async (req, res) => {
  const { mobile_no, password } = req.body;

  // Find user with requested email
  Seller.findOne({ mobile_no: mobile_no }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "Seller not found.",
      });
    } else {
      // console.log(process.env.TOKEN_SECRET);
      if (validatePassword(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "365d",
        });

        return res.status(201).send({
          message: "Successfully Logged In",
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

// exports.Adminlogin = async (req, res) => {
//   const { mobile_no, password } = req.body;

//   // Find user with requested email
//   Seller.findOne({ mobile_no: mobile_no }, function (err, user) {
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

exports.edit_seller = async (req, res) => {
  const {
    seller_name,
    sellerId,
    selleremail,
    mobile_no,
    password,
    business_type,
    store_address,
    store_name,
    gstin_no,
    state,
    city,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (seller_name) {
    data.seller_name = seller_name;
  }
  if (sellerId) {
    data.sellerId = sellerId;
  }
  if (selleremail) {
    data.selleremail = selleremail;
  }
  if (mobile_no) {
    data.mobile_no = mobile_no;
  }
  if (password) {
    data.password = password;
  }
  if (business_type) {
    data.business_type = business_type;
  }
  if (store_address) {
    data.store_address = store_address;
  }
  if (store_name) {
    data.store_name = store_name;
  }
  if (gstin_no) {
    data.gstin_no = gstin_no;
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
    data.seller_img = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data);
  if (data) {
    const findandUpdateEntry = await Seller.findOneAndUpdate(
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
