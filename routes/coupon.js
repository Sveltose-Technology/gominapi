const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const { addcoupon,editcoupon, getcoupon,getonecoupon,delcoupon,totalCoupon } = require("../controller/coupon");

router.post("/admin/addcoupon", addcoupon);
router.post("/admin/editcoupon/:id", editcoupon);
router.get("/admin/getcoupon", getcoupon);
router.get("/admin/getonecoupon/:id",getonecoupon )
router.get("/admin/delcoupon/:id", delcoupon);
router.get("/admin/totalCoupon", totalCoupon);


module.exports = router;
