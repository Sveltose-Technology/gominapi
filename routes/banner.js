const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { addbanner, getbanner } = require("../controller/banner");

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

// router.post(
//   "/admin/up_bannerload_image",
//   uploads.single("banner_img"),
//   addbanner
// );

router.post("/admin/addbanner", uploads.single("banner_img"), addbanner);
router.get("/admin/getbanner", getbanner);

module.exports = router;
