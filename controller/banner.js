const Addbanner = require("../models/banner");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addbanner = async (req, res) => {
  //console.log(req.body);
  const { banner_title, banner_img, bannertype, status } = req.body;

  const newAddbanner = new Addbanner({
    banner_title: banner_title,
    banner_img: banner_img,
    bannertype: bannertype,
    status: status,
  });

  if (req.files) {
    const findexist = await Addbanner.findOne({
      banner_title: banner_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      alluploads = [];
      for (let i = 0; i < req.files.length; i++) {
        const resp = await cloudinary.uploader.upload(req.files[i].path);
        fs.unlinkSync(req.files[i].path);
        alluploads.push(resp.secure_url);
      }
      if (alluploads.length !== 0) {
        newAddbanner.banner_img = alluploads;
        newAddbanner
          .save()
          .then((data) => {
            res.status(200).json({
              status: true,
              msg: "success",
              data: data,
            });
          })
          .catch((error) => {
            res.status(200).json({
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
exports.getbanner = async (req, res) => {
  const findall = await Addbanner.find().sort({ sortorder: 1 });
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

exports.viewonebanner = async (req, res) => {
  const findone = await Addbanner.findOne({ _id: req.params.id });
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

exports.delbanner = async (req, res) => {
  try {
    const deleteentry = await Addbanner.deleteOne({ _id: req.params.id });
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

exports.getbannerbytype = async (req, res) => {
  const findall = await Addbanner.find({ bannertype: req.params.id }).sort({
    sortorder: 1,
  });
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



exports.totalbanner = async (req, res) => {
  await Addbanner.countDocuments()
    .then((data) => {
      res.status(200).json({
        status: true,
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