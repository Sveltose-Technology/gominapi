const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const {tokenverify} = require("../functions/tokenverify")

const {
  addproductsubcategory,
  getproductsubcategory,
  getsubcatByseller,
  viewoneproductsubcategory,
  editproductsubcategory,
  deleteproductsubcategory,
  //   getsubcategory,
} = require("../controller/productsubcategory");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log(file);
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploads = multer({ storage: storage });

//Paths
router.post(
  "/admin/addproductsubcategory",
  uploads.single("product_img"),tokenverify,
  addproductsubcategory
);
router.get("/admin/getproductsubcategory", getproductsubcategory);
router.get("/admin/getsubcatByseller",tokenverify, getsubcatByseller);

router.get("/admin/viewoneproductsubcategory/:id",tokenverify, viewoneproductsubcategory);

router.post(
  "/admin/editproductsubcategory/:id",tokenverify,
  uploads.single("product_img"),
  editproductsubcategory
);
 
router.get("/admin/deleteproductsubcategory/:id", deleteproductsubcategory);

module.exports = router;
