const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const {addtrendingstore,gettrendingstore,del_trendingstore,viewonetrendingstore} = require("../controller/trendingstore");


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
  
  let upload = multer({ storage: storage });

router.post("/admin/addtrendingstore",upload.single("store_img"), addtrendingstore);
router.get("/admin/gettrendingstore", gettrendingstore);
router.get("/admin/del_trendingstore/:id", del_trendingstore);
router.get("/admin/viewonetrendingstore/:id", viewonetrendingstore);


 
 

module.exports = router;
