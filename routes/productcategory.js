const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const {
  addproductcategory,
  getproductCategory,
  getone_productcategory,
  editproductcategory,
  del_productcategory,
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
router.get("/admin/getproductCategory", getproductCategory);
router.get("/admin/getone_productcategory/:id", getone_productcategory);
// router.get("/admin/allproductsubcategory", allproductsubcategory);
router.get("/admin/del_productcategory/:id", del_productcategory);
router.post(
  "/admin/editproductcategory/:id",
  uploads.single("product_img"),
  editproductcategory
);

// //get subcategories of passed category
// router.get("/admin/getsubcategory/:id", getsubcategory);

module.exports = router;
