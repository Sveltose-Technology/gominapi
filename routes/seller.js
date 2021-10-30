const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  add_seller,
  getseller,
  login,
  Adminlogin,
} = require("../controller/seller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
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
router.post("/admin/add_seller", uploads.single("store_img"), add_seller);
router.get("/admin/getseller", getseller);
router.post("/admin/login", login);
router.post("/admin/Adminlogin", Adminlogin);

module.exports = router;
