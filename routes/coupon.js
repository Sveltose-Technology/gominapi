const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const { addcoupon,editcoupon, getcoupon,getcouponbyseller,getonecoupon,delcoupon,totalCoupon } = require("../controller/coupon");

router.post("/admin/addcoupon",tokenverify, addcoupon);
router.post("/admin/editcoupon/:id",tokenverify, editcoupon);
router.get("/admin/getcoupon", getcoupon);
router.get("/admin/getcouponbyseller",tokenverify, getcouponbyseller);

router.get("/admin/getonecoupon/:id",tokenverify,getonecoupon )
router.get("/admin/delcoupon/:id", delcoupon);
router.get("/admin/totalCoupon",tokenverify, totalCoupon);


module.exports = router;
