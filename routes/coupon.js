const express = require("express");
const router = express.Router();

const { addcoupon, getcoupon,delcoupon } = require("../controller/coupon");

router.post("/admin/addcoupon", addcoupon);
router.get("/admin/getcoupon", getcoupon);
router.get("/admin/delcoupon/:id", delcoupon);

module.exports = router;
