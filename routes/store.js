const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const { addstore } = require("../controller/store");

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

// let multipleUpload = uploads.fields([
//   { name: "storeImg", maxCount: 5 },
//   { name: "shoplogo_img", maxCount: 1 },
//   { name: "gstImg", maxCount: 2 },
//   { name: "storepan_img", maxCount: 1 },
//   { name: "tradelicence_img", maxCount: 1 },
// ]);

//Paths
router.post("/admin/addstore", uploads.array("storeImg"), addstore);

//router.post("/admin/addstore", multipleUpload, addstore);

module.exports = router;
