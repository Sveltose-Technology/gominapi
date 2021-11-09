const Product = require("../models/product");
//const Image = require("../models/product");

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
    product_name,
    sku_no,
    hsn_sac_no,
    short_desc,
    long_desc,
    productcategory,
    productsubcategory,
    brand,
    colour,
    size,
    material,
    stock,
    qty,
    reorder_level,
    unit,
    cost_price,
    sell_price,
    gst,
    product_img,
    sortorder,
    status,
  } = req.body;

  const newProduct = new Product({
    // productId: productId,
    product_name: product_name,
    sku_no: sku_no,
    hsn_sac_no: hsn_sac_no,
    short_desc: short_desc,
    long_desc: long_desc,
    productcategory: productcategory,
    productsubcategory: productsubcategory,
    brand: brand,
    colour: colour,
    size: size,
    material: material,
    stock: stock,
    qty: qty,
    reorder_level: reorder_level,
    unit: unit,
    cost_price: cost_price,
    sell_price: sell_price,
    gst: gst,
    product_img: product_img,
    sortorder: sortorder,
    status: status,
  });

  if (req.files) {
    const findexist = await Product.findOne({
      product_name: product_name,
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
      product_name: product_name,
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

exports.editproduct = async (req, res) => {
  const {
    product_name,
    sku_no,
    hsn_sac_no,
    short_desc,
    long_desc,
    productcategory,
    productsubcategory,
    brand,
    colour,
    size,
    material,
    stock,
    qty,
    reorder_level,
    unit,
    cost_price,
    sell_price,
    gst,
    product_img,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (product_name) {
    data.product_name = product_name;
  }
  if (sku_no) {
    data.sku_no = sku_no;
  }
  if (hsn_sac_no) {
    data.hsn_sac_no = hsn_sac_no;
  }
  if (short_desc) {
    data.short_desc = short_desc;
  }
  if (long_desc) {
    data.long_desc = long_desc;
  }
  if (productcategory) {
    data.productcategory = productcategory;
  }

  if (productsubcategory) {
    data.productsubcategory = productsubcategory;
  }
  if (brand) {
    data.brand = brand;
  }
  if (colour) {
    data.colour = colour;
  }
  if (size) {
    data.size = size;
  }
  if (material) {
    data.material = material;
  }
  if (stock) {
    data.stock = stock;
  }
  if (qty) {
    data.qty = qty;
  }
  if (reorder_level) {
    data.reorder_level = reorder_level;
  }
  if (unit) {
    data.unit = unit;
  }
  if (cost_price) {
    data.cost_price = cost_price;
  }
  if (sell_price) {
    data.sell_price = sell_price;
  }
  if (gst) {
    data.gst = gst;
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
    const findandUpdateEntry = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
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

exports.getproduct = async (req, res) => {
  const findall = await Product.find()
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand");
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
  const findone = await Product.findOne({ _id: req.params.id })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand");
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
