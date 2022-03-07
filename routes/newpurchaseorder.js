const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");
const multer = require("multer");
const fs = require("fs");

const {
    addnewpurchaseorder,getpurchaseorder,editnewpurchaseorder,getonepurchaseorder,delpurchaseorder,getpurchaseorderbytoken,pendingpurchaseorderlist
   
} = require("../controller/newpurchaseorder");


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


// PATHS

router.post("/admin/addnewpurchaseorder",uploads.single("upload_Invoice"),tokenverify, addnewpurchaseorder);
router.get("/admin/getpurchaseorder",tokenverify, getpurchaseorder);
//router.get("/admin/getpurchaseorderbytoken",tokenverify, getpurchaseorderbytoken);

router.post("/admin/editnewpurchaseorder/:id",uploads.single("upload_Invoice"),tokenverify, editnewpurchaseorder);
router.get("/admin/getonepurchaseorder/:id",tokenverify, getonepurchaseorder);
router.get("/admin/delpurchaseorder/:id", delpurchaseorder);

router.get("/admin/pendingpurchaseorderlist",tokenverify, pendingpurchaseorderlist);



 
 

module.exports = router;
