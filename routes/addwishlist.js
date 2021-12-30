const express = require("express");
const router = express.Router();

const { addwishlist,getallwishlist } = require("../controller/addwishlist");

//path
router.post("/admin/addwishlist", addwishlist);
router.get("/admin/getallwishlist", getallwishlist);


module.exports = router;
