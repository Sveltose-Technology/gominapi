const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  add_seller,
  getseller,
  login,
  del_seller,
  edit_seller,
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
router.post("/admin/login", login);
router.post(
  "/admin/edit_seller/:id",
  uploads.single("seller_img"),
  edit_seller
);

router.post("/admin/delSeller/:id", del_seller);

module.exports = router;
