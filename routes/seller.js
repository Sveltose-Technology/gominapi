const express = require("express");
const router = express.Router();

const { add_seller } = require("../controller/seller");

//Paths
router.post("/admin/add_seller", add_seller);

module.exports = router;
