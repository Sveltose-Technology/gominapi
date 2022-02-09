const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { tokenverify } = require("../functions/tokenverify");

const {
  addsupplier,
  del_supplier,
  Getsupplier,
  edit_supplier,
  getonesupplier,
  totalsupplierBytoken
} = require("../controller/supplier");
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
router.post("/admin/addsupplier",tokenverify, addsupplier);
router.get("/admin/Getsupplier",tokenverify, Getsupplier);
router.get("/admin/del_supplier/:id", del_supplier);
router.post("/admin/edit_supplier/:id",tokenverify, edit_supplier);

router.get("/admin/getonesupplier/:id",tokenverify, getonesupplier);
router.get("/admin/totalsupplierBytoken",tokenverify, totalsupplierBytoken);


module.exports = router;
