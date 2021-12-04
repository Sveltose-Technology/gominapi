const express = require("express");
const router = express.Router();

const { addcoupon, getcoupon,delcoupon,totalCoupon } = require("../controller/coupon");

router.post("/admin/addcoupon", addcoupon);
router.get("/admin/getcoupon", getcoupon);
router.get("/admin/delcoupon/:id", delcoupon);
router.get("/admin/totalCoupon", totalCoupon);


module.exports = router;
