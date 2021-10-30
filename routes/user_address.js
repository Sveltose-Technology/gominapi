const express = require("express");
const router = express.Router();

const { adduser_address, edit_address } = require("../controller/user_address");

//Paths
router.post("/user/adduser_address", adduser_address);
router.post("/user/edituser_address/:id", edit_address);

module.exports = router;
