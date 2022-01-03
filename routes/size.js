const express = require("express");
const router = express.Router();

const {
    addsize,getsize,deleteSize,viewonesize,editsize
   
} = require("../controller/size");

//path
router.post("/admin/addsize", addsize);
router.get("/admin/getsize", getsize);
router.get("/admin/viewonesize/:id", viewonesize);
router.get("/admin/editsize/:id", editsize);
router.get("/admin/deleteSize/:id", deleteSize);


 

module.exports = router;
