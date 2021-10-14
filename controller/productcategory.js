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
  const { name, product_img, desc, sortorder, status } = req.body;

  const newProductcategory = new Productcategory({
    name: name,
    product_img: product_img,
    desc: desc,
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
