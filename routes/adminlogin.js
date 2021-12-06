const express = require("express");
const router = express.Router();

const {
    adminlogin,createadmin
} = require("../controller/adminlogin");

//Paths
router.post("/admin/createadmin", createadmin);
router.post("/admin/adminlogin", adminlogin);
 
module.exports = router;
