const express = require("express");
const router = express.Router();

const { verifytoken } = require("../functions/verifytoken");

const {
  addcus_address,
  edit_address,
  getaddress,
  viewoneuseraddress,
} = require("../controller/user_address");

//Paths
router.post("/user/addcus_address",verifytoken, addcus_address);
router.post("/user/edit_address", verifytoken, edit_address);
router.get("/user/getaddress", verifytoken, getaddress);
router.get("/user/viewoneuseraddress", verifytoken, viewoneuseraddress);

module.exports = router;
