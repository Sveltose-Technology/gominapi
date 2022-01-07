const express = require("express");
const router = express.Router();

const {
  addreview,getallreview,totalcomment,totalrating,getavgrating
} = require("../controller/review");

//Paths
router.post("/admin/addreview", addreview);
router.get("/admin/getallreview", getallreview);
router.get("/admin/totalcomment", totalcomment);
 
 


 

module.exports = router;
 