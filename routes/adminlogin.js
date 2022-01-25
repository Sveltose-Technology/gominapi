const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  adminlogin,
  createadmin,
  editadmin,
  getoneadmin,
} = require("../controller/adminlogin");

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
router.post("/admin/createadmin", uploads.single("image"), createadmin);
router.post("/admin/adminlogin", adminlogin);
router.post("/admin/editadmin/:id", editadmin);
router.get("/admin/getoneadmin/:id", getoneadmin);

module.exports = router;
