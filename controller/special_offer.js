const Specialoffer = require("../models/special_offer");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.add_specialoffer = async (req, res) => {
  const {
    specialoffer_title,
    product,
    rate,
    product_qty,
    offer_img,
    status,
    sortorder,
  } = req.body;

  const newSpecialoffer = new Specialoffer({
    specialoffer_title: specialoffer_title,
    product: product,
    rate: rate,
    product_qty: product_qty,
    offer_img: offer_img,
    status: status,
    sortorder: sortorder,
  });
  if (req.file) {
    const findexist = await Specialoffer.findOne({
      specialoffer_title: specialoffer_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newSpecialoffer.offer_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newSpecialoffer.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newSpecialoffer,
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
    const findexist = await Specialoffer.findOne({
      specialoffer_title: specialoffer_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newSpecialoffer
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

exports.viewonespecialoffer = async (req, res) => {
  //const getuser = await User.findOne({ _id: req.userId });
  const findone = await Specialoffer.findOne({ _id: req.params.id }).populate(
    "product"
  );
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

exports.Getoffer = async (req, res) => {
  const findall = await Specialoffer.find()
    .populate("product")
    .sort({ sortorder: 1 });
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

exports.del_offer = async (req, res) => {
  try {
    const deleteentry = await Specialoffer.deleteOne({ _id: req.params.id });
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
