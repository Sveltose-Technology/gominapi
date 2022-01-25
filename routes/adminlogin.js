const express = require("express");
const router = express.Router();

const {
    adminlogin,createadmin,editadmin,getoneadmin
} = require("../controller/adminlogin");

//Paths
router.post("/admin/createadmin", createadmin);
router.post("/admin/adminlogin", adminlogin);
router.post("/admin/editadmin/:id", editadmin);
router.get("/admin/getoneadmin/:id", getoneadmin);

 
module.exports = router;
