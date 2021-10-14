const express = require("express");
const router = express.Router();

const { addstaff } = require("../controller/staff");

//Paths
router.get("/admin/addstaff", addstaff);

module.exports = router;
