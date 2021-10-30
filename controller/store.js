const Store = require("../models/store");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addstore = async (req, res) => {
  const {
    storeID,
    store_logo,
    store_name,
    email,
    mobile,
    address,
    owner_name,
    sortorder,
    status,
  } = req.body;

  const newStore = new Store({
    storeID: storeID,
    store_logo: store_logo,
    store_name: store_name,
    email: email,
    mobile: mobile,
    address: address,
    owner_name: owner_name,
    sortorder: sortorder,
    status: status,
  });
  if (req.file) {
    const findexist = await Store.findOne({ storeID: storeID });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newStore.store_logo = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newStore.save().then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
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
    const findexist = await Store.findOne({ storeID: storeID });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newStore
        .save()
        .then((data) => {
          res.status(400).json({
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

exports.allstore = async (req, res) => {
  const findall = await Store.find().sort({ sortorder: 1 });
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

exports.viewonestore = async (req, res) => {
  const findone = await Store.findOne({ _id: req.params.id });
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

exports.del_store = async (req, res) => {
  try {
    const deleteentry = await Store.deleteOne({ _id: req.params.id });
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
