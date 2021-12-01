const express = require("express");
const router = express.Router();

const { createoffer, get_coupon } = require("../controller/coupon");

router.post("/admin/createoffer", createoffer);
router.get("/admin/get_coupon", get_coupon);

module.exports = router;
