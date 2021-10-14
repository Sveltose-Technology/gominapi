const express = require("express");
const router = express.Router();

const { adduser, Adminlogin } = require("../controller/user");

//Paths
router.post("/user/signup", adduser);
router.post("/user/Adminlogin", Adminlogin);

module.exports = router;
