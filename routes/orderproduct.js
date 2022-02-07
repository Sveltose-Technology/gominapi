const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");

const {
    addoderproduct,
    getoneorderproduct
//   getorder,
//   pending_order,
//   delivery_order,
//   cancelled_order,
//   complete_order,
//   del_order,
//   totalorder,
//   salesbyseller,
//   getorderbysellerbytoken,
//   editOrder,
//   viewoneOrder
} = require("../controller/orderproduct");

// PATHS

router.post("/admin/addoderproduct", verifytoken,  addoderproduct);
router.get("/admin/getoneorderproduct/:id",  getoneorderproduct);

// router.get("/admin/getorder", verifytoken, getorder);
// router.get(
//   "/admin/getorderbysellerbytoken",tokenverify,
//   getorderbysellerbytoken
// );

// router.get("/admin/pending_order", tokenverify, pending_order);
// router.get("/admin/delivery_order", verifytoken, delivery_order);
// router.get("/admin/cancel_order", verifytoken, cancelled_order);
// router.get("/admin/complete_order", verifytoken, complete_order);
// router.get("/admin/del_order", del_order);
// router.get("/admin/totalorder", totalorder);
// router.get("/admin/salesbyseller", tokenverify, salesbyseller);
// router.post("/admin/editOrder/:id", tokenverify,editOrder);
// router.get("/admin/viewoneOrder/:id",tokenverify,   viewoneOrder);


module.exports = router;
 

 