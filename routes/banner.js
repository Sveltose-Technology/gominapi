const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addbanner,
  getbanner,
  viewonebanner,
  delbanner,
  getbannerbytype,
  totalbanner
} = require("../controller/banner");

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

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
});

// PATHS
router.post("/admin/addbanner", upload.array("banner_img"), addbanner);
router.get("/admin/getbanner", getbanner);
router.get("/admin/viewonebanner/:id", viewonebanner);
router.get("/admin/delbanner/:id", delbanner);
router.get("/admin/bannerbytype/:id", getbannerbytype);
router.get("/admin/totalbanner", totalbanner);

module.exports = router;
