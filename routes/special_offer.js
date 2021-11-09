const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
//const { verifytoken } = require("../functions/verifytoken");

const {
  add_specialoffer,
  Getoffer,
  del_offer,
  viewonespecialoffer,
} = require("../controller/special_offer");
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
router.post(
  "/admin/add_specialoffer",
  uploads.single("offer_img"),
  add_specialoffer
);
router.get("/admin/Getoffer", Getoffer);
router.get("/admin/viewonespecialoffer/:id", viewonespecialoffer);
router.get("/admin/del_offer/:id", del_offer);

module.exports = router;
