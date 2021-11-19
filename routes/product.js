const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
//const { verifytoken } = require("../functions/verifytoken");

const {
  addproduct,
  getproduct,
  editproduct,
  getoneproduct,
  productbycategory,
  productsubcategory,
  productbybrand,
  del_product,
} = require("../controller/product");

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
router.post("/admin/addproduct", uploads.array("product_img"), addproduct);
router.post(
  "/admin/editproduct/:id",
  uploads.array("product_img"),
  editproduct
);
router.get("/admin/getproduct", getproduct);
router.get("/admin/getoneproduct/:id", getoneproduct);
router.get("/admin/productbycategory/:id", productbycategory);
router.get("/admin/productbybrand/:id", productbybrand);

router.get("/admin/productsubcategory/:id", productsubcategory);

router.get("/admin/del_product/:id", del_product);

module.exports = router;
