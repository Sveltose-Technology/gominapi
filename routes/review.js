const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");


const {
  addreview,getallreview,totalcomment,totalrating,getavgrating,getonereviewproduct
} = require("../controller/review");

//Paths
router.post("/admin/addreview",verifytoken, addreview);
router.get("/admin/getallreview", getallreview);
router.get("/admin/totalcomment", totalcomment);
router.get("/admin/getonereviewproduct/:id", getonereviewproduct);

 
 


 

module.exports = router;
 