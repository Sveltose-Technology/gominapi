const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");

const {
  addorder,
  getorder,
  pending_order,
  delivery_order,
  cancelled_order,
  complete_order,
  del_order,
  totalorder,
  salesbyseller,
  getorderbysellerbytoken,
  editOrder,
  viewoneOrder
} = require("../controller/orderproduct");

// PATHS

router.post("/admin/addorder", verifytoken,  addorder);
router.get("/admin/getorder", verifytoken, getorder);
router.get(
  "/admin/getorderbysellerbytoken/:id",
  getorderbysellerbytoken
);

router.get("/admin/pending_order", tokenverify, pending_order);
router.get("/admin/delivery_order", verifytoken, delivery_order);
router.get("/admin/cancel_order", verifytoken, cancelled_order);
router.get("/admin/complete_order", verifytoken, complete_order);
router.get("/admin/del_order", del_order);
router.get("/admin/totalorder", totalorder);
router.get("/admin/salesbyseller", tokenverify, salesbyseller);
router.post("/admin/editOrder/:id", tokenverify,editOrder);
router.get("/admin/viewoneOrder", verifytoken, viewoneOrder);


module.exports = router;
 

 