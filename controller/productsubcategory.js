const Productsubcategory = require("../models/productsubcategory");
const seller = require("../models/seller")
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
    seller :req.sellerId,
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
  const findall = await Productsubcategory.find()
    .sort({ sortorder: 1 })
    .populate("productcategory");
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


exports.getsubcatByseller = async (req, res) => {
  const findall = await Productsubcategory.find({seller:req.sellerId}).populate("seller")
    .sort({ sortorder: 1 })
    .populate("productcategory");
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


exports.editproductsubcategory = async (req, res) => {
  const { name, productcategory, product_img, desc, sortorder, status } =
    req.body;

  data = {};
  if (name) {
    data.name = name;
  }
  if (productcategory) {
    data.productcategory = productcategory;
  }
  if (desc) {
    data.desc = desc;
  }
  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  console.log(data);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.product_img = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  console.log(req.file);
  if (data) {
    const findandUpdateEntry = await Productsubcategory.findOneAndUpdate(
      {
       $and : [{seller : req.sellerId},{_id : req.params.id}]
      },
      { $set: data },
      { new: true }
    )
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

exports.viewoneproductsubcategory = async (req, res) => {
  const findone = await Productsubcategory.findOne({ $and:[{seller : req.sellerId},{_id: req.params.id}]}).populate("productcategory").populate("seller")
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

exports.deleteproductsubcategory = async (req, res) => {
  try {
    const deleteentry = await Productsubcategory.deleteOne({
      _id: req.params.id,
    });
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
