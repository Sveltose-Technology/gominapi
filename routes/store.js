const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { tokenverify } = require("../functions/tokenverify");

const {
  addstore,
  getstore,
  getstorebytoken,
  getonestore,
  getonestorebytoken,
  editstore,
  del_store,
  storebyseller,
  store_req,
  totalstorebyseller,
  totalstore,
  browsebytrending_store,
  searchstore
} = require("../controller/store");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./uploadesimages`;
    if (!fs.existsSync("uploadesimages")) {
      fs.mkdirSync("uploadesimages");
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    //console.log(Date.now() + path.extname(file.originalname));
    cb(null, Date.now() + path.extname(file.originalname));
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
  { name: "shoplogo_img", maxCount: 5 },
  { name: "gstImg", maxCount: 5 },
  { name: "storepan_img", maxCount: 5 },
  { name: "tradelicence_img", maxCount: 5 },
  { name: "companypan_img", maxCount: 5 },
  { name: "address_proof_img", maxCount: 5 },
]);

let checkitem = (req, res, next) => {
  //console.log(req.file);
  //console.log(req.files);
  //console.log(req.body);
  next();
};

//Paths
//router.post("/admin/addstore", uploads.array("storeImg"), addstore);

router.post("/admin/addstore", multipleUpload,tokenverify, addstore);
router.get("/admin/del_store/:id", del_store);
router.get("/admin/getstore", getstore);
//router.get("/admin/getstore",tokenverify, getstore);

router.get("/admin/getonestore/:id",  getonestore);
router.get("/admin/getonestorebytoken/:id",tokenverify,  getonestorebytoken);
router.get("/admin/storebyseller", tokenverify, storebyseller);
router.post("/admin/editstore/:id", multipleUpload,tokenverify, editstore);
router.get("/admin/store_req", store_req);
router.get("/admin/totalstorebyseller",tokenverify, totalstorebyseller)
router.get("/admin/totalstore", totalstore)

router.post("/admin/searchstore", searchstore)
router.get("/admin/browsebytrending_store",  browsebytrending_store);
router.get("/admin/getonestorebytoken",  browsebytrending_store);


module.exports = router;
 