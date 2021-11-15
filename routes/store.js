const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const { addstore, getstore, getonestore } = require("../controller/store");

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

let multipleUpload = uploads.fields([
  { name: "storeImg", maxCount: 5 },
  { name: "shoplogo_img", maxCount: 1 },
  { name: "gstImg", maxCount: 1 },
  { name: "storepan_img", maxCount: 1 },
  { name: "tradelicence_img", maxCount: 1 },
  { name: "companypan_img", maxCount: 1 },
  { name: "address_proof_img", maxCount: 1 },
]);

//Paths
//router.post("/admin/addstore", uploads.array("storeImg"), addstore);

router.post("/admin/addstore", multipleUpload, addstore);
router.get("/admin/getstore", getstore);
router.get("/admin/getonestore/:id", getonestore);

module.exports = router;
