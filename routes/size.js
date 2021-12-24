const express = require("express");
const router = express.Router();

const {
    addsize,viewonesize,viewallsize,delsize,editsize
} = require("../controller/size");



// Paths
router.post("/admin/addsize", addsize);
router.get("/admin/viewonesize/:id", viewonesize);
router.get("/admin/viewallsize", viewallsize);
router.get("/admin/delsize/:id", delsize);
router.post("/admin/editsize/:id", editsize);

 


module.exports = router;


