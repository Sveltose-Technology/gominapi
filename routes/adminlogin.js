const express = require("express");
const router = express.Router();

const {
    adminlogin,
} = require("../controller/adminlogin");

//Paths
router.post("/admin/adminlogin", adminlogin);
 
module.exports = router;
