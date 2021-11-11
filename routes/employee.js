const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const {
  addemployee,
  Getemployee,
  del_employee,
} = require("../controller/employee");
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
router.post("/admin/addemployee", uploads.single("image"), addemployee);
router.get("/admin/Getemployee", Getemployee);
router.get("/admin/del_employee/:id", del_employee);

module.exports = router;
