const Seller = require("../models/seller");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
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

exports.add_seller = async (req, res) => {
  const {
    seller_name,
    sellerId,
    email,
    mobile_no,
    password,
    store_img,
    business_type,
    store_name,
    store_address,
    gstin_no,
    state,
    city,
    status,
    sortorder,
  } = req.body;
  //console.log(req.body);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);

  const token = generateAccessToken({ mobile_no: mobile_no });

  const newSeller = new Seller({
    seller_name: seller_name,
    sellerId: sellerId,
    email: email,
    mobile_no: mobile_no,
    password: hashpassword,
    store_img: store_img,
    business_type: business_type,
    store_name: store_name,
    store_address: store_address,
    gstin_no: gstin_no,
    state: state,
    city: city,
    status: status,
    sortorder: sortorder,
  });

  if (req.file) {
    const findexist = await Seller.findOne({ sellerId: sellerId });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      console.log(req.file);
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newSeller.store_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
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
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
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

exports.Adminlogin = async (req, res) => {
  const { mobile_no, password } = req.body;

  // Find user with requested email
  Seller.findOne({ mobile_no: mobile_no }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      console.log(process.env.TOKEN_SECRET);
      if (validatePassword(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
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
