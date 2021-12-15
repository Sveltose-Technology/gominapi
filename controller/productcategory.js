const Productcategory = require("../models/productcategory");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addproductcategory = async (req, res) => {
  const { name, product_img,price, desc, sortorder, status } = req.body;

  const newProductcategory = new Productcategory({
    name: name,
    product_img: product_img,
    desc: desc,
    price : price,
    sortorder: sortorder,
    status: status,
  });
  if (req.file) {
    const findexist = await Productcategory.findOne({ name: name });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newProductcategory.product_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newProductcategory.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newProductcategory,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  } else {
    const findexist = await Productcategory.findOne({ name: name });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newProductcategory
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

exports.editproductcategory = async (req, res) => {
  const { name, product_img, desc, sortorder, status } = req.body;
  //const response = await cloudinary.uploader.upload(req.file.path);

  data = {};
  if (name) {
    data.name = name;
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
    const findandUpdateEntry = await Productcategory.findOneAndUpdate(
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

exports.getproductCategory = async (req, res) => {
  const findall = await Productcategory.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "error",
      error: "error",
    });
  }
};

exports.getone_productcategory = async (req, res) => {
  const findone = await Productcategory.findOne({ _id: req.params.id });
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

exports.del_productcategory = async (req, res) => {
  try {
    const deleteentry = await Productcategory.deleteOne({
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
