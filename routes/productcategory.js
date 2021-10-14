const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const {
  addproductcategory,
  //   editproductsubcategory,
  //   viewoneproductsubcategory,
  //   allproductsubcategory,
  //   deleteproductsubcategory,
  //   getsubcategory,
} = require("../controller/productcategory");

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
  "/admin/addproductcategory",
  uploads.single("product_img"),
  addproductcategory
);
// router.post(
//   "/admin/editproductsubcategory/:id",
//   uploads.array("product_img"),
//   editproductsubcategory
// );
// router.get("/admin/viewoneproductsubcategory/:id", viewoneproductsubcategory);
// router.get("/admin/allproductsubcategory", allproductsubcategory);
// router.get("/admin/deleteproductsubcategory/:id", deleteproductsubcategory);
// //get subcategories of passed category
// router.get("/admin/getsubcategory/:id", getsubcategory);

module.exports = router;
