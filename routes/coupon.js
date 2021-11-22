const express = require("express");
const router = express.Router();

const { createoffer } = require("../controller/coupon");

router.post("/admin/createoffer", createoffer);

module.exports = router;
