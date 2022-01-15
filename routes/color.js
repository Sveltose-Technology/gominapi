const express = require("express");
const router = express.Router();

const {
    addcolor,getcolor,editcolor,viewonecolor,deletecolor
   
} = require("../controller/color");

//path
router.post("/admin/addcolor", addcolor);
router.post("/admin/editcolor/:id", editcolor);
router.get("/admin/getcolor", getcolor);
router.get("/admin/viewonecolor/:id", viewonecolor);
router.get("/admin/deletecolor/:id", deletecolor);




 

module.exports = router;
