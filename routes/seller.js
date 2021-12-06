const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  add_seller,
  getseller,
  adminlogin,
  del_seller,
  editseller,
  getoneseller,
  totalseller,
  sellerlogin
  //storebyseller,
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
router.post("/admin/seller_signup", uploads.single("seller_img"), add_seller);
router.get("/admin/getseller", getseller);
router.post("/admin/adminlogin", adminlogin);
router.post("/admin/sellerlogin", sellerlogin);

router.post("/admin/editseller/:id", editseller);

router.get("/admin/delSeller/:id", del_seller);
//router.get("/admin/storebyseller/:id", storebyseller);
router.get("/admin/getoneseller/:id", getoneseller);
router.get("/admin/totalseller", totalseller);
module.exports = router;

 