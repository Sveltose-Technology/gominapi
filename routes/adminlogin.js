const express = require("express");
const router = express.Router();

const {
    adminlogin,createadmin,setting
} = require("../controller/adminlogin");

//Paths
router.post("/admin/createadmin", createadmin);
router.post("/admin/adminlogin", adminlogin);
//router.post("/admin/setting", setting);

 
module.exports = router;
