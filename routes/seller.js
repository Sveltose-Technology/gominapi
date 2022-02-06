const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { tokenverify } = require("../functions/tokenverify");

const {
  signup,
  addemployee,
  getseller,
  del_seller,
  editseller,
  getoneseller,
  totalseller,
  sellerlogin,
  sendOtp,
  emailsend,
  verifyOtp,
  getemployecreatedbyseller,

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
router.post("/admin/signup", uploads.single("image"), signup);
router.post(
  "/admin/addemployee",
  uploads.single("image"),
  tokenverify,
  addemployee
);

router.get("/admin/getseller", tokenverify, getseller);
router.get(
  "/admin/getemployecreatedbyseller",
  tokenverify,
  getemployecreatedbyseller
);

//router.post("/admin/Adminlogin", Adminlogin);
router.post("/admin/sellerlogin", sellerlogin);

router.post("/admin/editseller", tokenverify, editseller);

router.get("/admin/delSeller/:id", del_seller);
//router.get("/admin/storebyseller/:id", storebyseller);
router.get("/admin/getoneseller", tokenverify, getoneseller);
router.get("/admin/totalseller", totalseller);
router.post("/admin/sendOtp", sendOtp);
//router.post("/admin/emailsend", emailsend);
router.post("/admin/verifyOtp", verifyOtp);

module.exports = router;
