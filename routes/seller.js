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
  getoneempcreatedbyseller,
  forgetpassword,
  editempByseller,
  totalempbyseller,
  viewoneseller,
  sellerForgetPass,

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

router.get("/admin/getseller", getseller);
router.get(
  "/admin/getemployecreatedbyseller",
  tokenverify,
  uploads.single("image"),
  getemployecreatedbyseller
);
router.get(
  "/admin/getoneempcreatedbyseller/:id",
  tokenverify,
  getoneempcreatedbyseller
);
router.post(
  "/admin/editempByseller/:id",
  tokenverify,
  uploads.single("image"),
  editempByseller
);
//router.post("/admin/Adminlogin", Adminlogin);
router.post("/admin/sellerlogin", sellerlogin);

router.post(
  "/admin/editseller",
  uploads.single("image"),
  tokenverify,
  editseller
);

router.get("/admin/del_seller/:id", del_seller);
//router.get("/admin/storebyseller/:id", storebyseller);
router.get("/admin/getoneseller", tokenverify, getoneseller);
router.get("/admin/viewoneseller/:id", viewoneseller);

router.get("/admin/totalseller", totalseller);
router.get("/admin/totalempbyseller", tokenverify, totalempbyseller);

router.post("/admin/sendOtp", sendOtp);
//router.post("/admin/emailsend", emailsend);
router.post("/admin/verifyOtp", verifyOtp);
router.post("/admin/forgetpassword", forgetpassword);
router.post("/admin/sellerForgetPass", tokenverify, sellerForgetPass);

module.exports = router;
