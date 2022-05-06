const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
//const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");


const {
  addproduct,
  getproduct,
  editproduct,
  getoneproduct,
  productbycategory,
  productbysubcategory,
  productbybrand,
  del_product,
  totalproduct,
  totalproductbyseller,
  searchItem,
  searchinputproduct,
  searchinputbycategory,
  productbystore,
  getproductbytagname,
  productsearchgetstore,
   productbysize,
  getuniquetag,
  productbycolor,
  productbypricerange,
  productbysellerbytoken,
   productbyemployee
} = require("../controller/product");

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
  { name: "product_img", maxCount: 5 },
 
  //   { name: "storepan_img", maxCount: 5 },
  //   { name: "tradelicence_img", maxCount: 5 },
  //   { name: "companypan_img", maxCount: 5 },
  //   { name: "address_proof_img", maxCount: 5 },
]);

//Paths
router.post("/admin/addproduct", multipleUpload,tokenverify, addproduct);
router.post(
  "/admin/editproduct/:id",tokenverify,
  multipleUpload,
  editproduct
);
router.get("/admin/getproduct", getproduct);
router.get("/admin/getoneproduct/:id", getoneproduct);
router.get("/admin/productbycategory/:id", productbycategory);
router.get("/admin/productbybrand/:id", productbybrand);
//router.get("/admin/productbymaterial/:id", productbymaterial);

router.get("/admin/productbysubcategory/:id", productbysubcategory);

router.get("/admin/del_product/:id", del_product);
router.get("/admin/totalproductbyseller",tokenverify,totalproductbyseller);
router.get("/admin/totalproduct", totalproduct);

router.post("/admin/searchItem", searchItem);
router.post("/admin/searchinputproduct", searchinputproduct);
router.post("/admin/searchinputbycategory", searchinputbycategory);
router.get("/admin/productbystore/:id", productbystore);
router.get("/admin/getproductbytagname/:id", getproductbytagname);

router.post("/admin/productsearchgetstore", productsearchgetstore);
router.get("/admin/productbysize/:id", productbysize);
router.get("/admin/productbycolor/:id", productbycolor);
router.get("/admin/getuniquetag", getuniquetag);
router.post("/admin/productbypricerange", productbypricerange);
router.get("/admin/productbysellerbytoken",tokenverify, productbysellerbytoken);
 router.get("/admin/productbyemployee",tokenverify,productbyemployee);


 
 
module.exports = router;
 