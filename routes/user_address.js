const express = require("express");
const router = express.Router();

const { verifytoken } = require("../functions/verifytoken");

const { addcus_address, edit_address,getaddress,viewoneuseraddress } = require("../controller/user_address");

//Paths
 router.post("/user/addcus_address", addcus_address);
 router.post("/user/edit_address/:id", edit_address);
 router.get("/user/getaddress",verifytoken, getaddress);
 //router.post("/user/viewoneuseraddress",verifytoken, viewoneuseraddress);



module.exports = router;
