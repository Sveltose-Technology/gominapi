const express = require("express");
const router = express.Router();

const { addcus_address, edit_address } = require("../controller/user_address");

//Paths
 router.post("/user/addcus_address", addcus_address);
 router.post("/user/edit_address/:id", edit_address);

module.exports = router;
