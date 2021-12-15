const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const { addcoupon, getcoupon,delcoupon,totalCoupon } = require("../controller/coupon");

router.post("/admin/addcoupon",tokenverify, addcoupon);
router.get("/admin/getcoupon",tokenverify, getcoupon);
router.get("/admin/delcoupon/:id", delcoupon);
router.get("/admin/totalCoupon", totalCoupon);


module.exports = router;
