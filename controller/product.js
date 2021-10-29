const Product = require("../models/product");
const Image = require("../models/product");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addproduct = async (req, res) => {
  const {
    //productId,
    item_name,
    short_desc,
    desc,
    hsn_code,
    productcategory,
    productsubcategory,
    unit,
    alt_unit,
    gst_rate,
    type_of_supply,
    material,
    stock_qty,
    stock_clearance_limit,
    size,
    colour,
    product_img,
    //barcode,
    brand,
    inc_duty_tax,
    rate,
    sortorder,
    status,
  } = req.body;

  const newProduct = new Product({
    // productId: productId,
    item_name: item_name,
    short_desc: short_desc,
    desc: desc,
    hsn_code: hsn_code,
    productcategory: productcategory,
    productsubcategory: productsubcategory,
    unit: unit,
    alt_unit: alt_unit,
    gst_rate: gst_rate,
    type_of_supply: type_of_supply,
    //varient: varient,
    material: material,
    stock_qty: stock_qty,
    stock_clearance_limit: stock_clearance_limit,
    size: size,
    colour: colour,
    product_img: product_img,
    //barcode: barcode,
    brand: brand,
    inc_duty_tax: inc_duty_tax,
    sortorder: sortorder,
    status: status,
    rate: rate,
  });

  if (req.files) {
    const findexist = await Product.findOne({
      item_name: item_name,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      // console.log(req.files);
      alluploads = [];
      for (let i = 0; i < req.files.length; i++) {
        const resp = await cloudinary.uploader.upload(req.files[i].path);
        fs.unlinkSync(req.files[i].path);

        alluploads.push(resp.secure_url);
      }
      //console.log(alluploads);

      if (alluploads.length !== 0) {
        newProduct.product_img = alluploads;
        newProduct.save().then((result) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: result,
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
    // console.log("changed node");
    const findexist = await Product.findOne({
      item_name: item_name,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newProduct
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

exports.getproduct = async (req, res) => {
  const findall = await Product.find().sort({ sortorder: 1 });
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

exports.getoneproduct = async (req, res) => {
  const findone = await Product.findOne({ _id: req.params.id });
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

exports.del_product = async (req, res) => {
  try {
    const deleteentry = await Product.deleteOne({ _id: req.params.id });
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
