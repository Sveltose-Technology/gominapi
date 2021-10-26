const Seller = require("../models/seller");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

exports.add_seller = async (req, res) => {
  const {
    seller_name,
    sellerId,
    selleremail,
    mobile_no,
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

  const newSeller = new Seller({
    seller_name: seller_name,
    sellerId: sellerId,
    selleremail: selleremail,
    mobile_no: mobile_no,
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
