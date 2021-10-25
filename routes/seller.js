const express = require("express");
const router = express.Router();

const { add_seller, getseller } = require("../controller/seller");

//Paths
router.post("/admin/add_seller", add_seller);
router.get("/admin/getseller", getseller);

module.exports = router;
