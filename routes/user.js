const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
//const crypto = require("crypto");
//const { verifytoken } = require("../functions/verifytoken");

const {
  adduser,
  sendotp,
  alluser,
  deleteuser,
  edituser,
  verifyotp,
  totalusers
} = require("../controller/user");

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
router.post("/user/signup", uploads.single("userImage"), adduser);
//router.post("/user/edituser/:id", uploads.single("userImage"), edituser);
//router.post("/user/edituser/:id", uploads.single("userImage"), edituser);
//router.post("/user/edituser/:id", uploads.single("userImage"), edituser);
router.get("/user/alluser", alluser);
router.get("/user/deleteuser/:id", deleteuser);
router.post("/user/sendotp", sendotp);
router.post("/user/verifyotp", verifyotp);
//router.get("/user/totalusers", totalusers);
router.get("/user/totalusers",totalusers)
module.exports = router;
 