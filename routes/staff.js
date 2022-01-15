const express = require("express");
const router = express.Router();

const { addstaff, Adminlogin } = require("../controller/staff");

//Paths
router.post("/admin/addstaff", addstaff);
//router.post("/admin/Adminlogin", Adminlogin);

module.exports = router;
