const Productsubcategory = require("../models/productsubcategory");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addproductsubcategory = async (req, res) => {
  const { name, desc, productcategory, product_img, sortorder, status } =
    req.body;

  const newProductsubcategory = new Productsubcategory({
    name: name,
    desc: desc,
    productcategory: productcategory,
    product_img: product_img,
    sortorder: sortorder,
    status: status,
  });
  if (req.file) {
    const findexist = await Productsubcategory.findOne({ name: name });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newProductsubcategory.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newProductsubcategory.save().then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: newProductsubcategory,
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
    const findexist = await Productsubcategory.findOne({ name: name });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newProductsubcategory
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
  }
};

exports.getproductsubcategory = async (req, res) => {
  const findall = await Productsubcategory.find().sort({ sortorder: 1 });
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
      data: "error",
    });
  }
};