const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");

const {
  addstore,
  allstore,
  viewonestore,
  del_store,
  edit_store,
} = require("../controller/store");

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
router.post("/admin/addstore", uploads.single("store_logo"), addstore);
router.get("/admin/allstore", allstore);
router.get("/admin/viewonestore/:id", viewonestore);
router.get("/admin/del_store/:id", del_store);
router.post("/admin/edit_store/:id", uploads.single("store_logo"), edit_store);

module.exports = router;
