const express = require("express");
const router = express.Router();

const {
  addorder,
  getorder,
  pending_order,
  delivery_order,
  cancelled_order,
  complete_order,
  del_order,
} = require("../controller/orderproduct");

// PATHS

router.post("/admin/addorder", addorder);
router.get("/admin/getorder", getorder);
router.get("/admin/pending_order", pending_order);
router.get("/admin/delivery_order", delivery_order);
router.get("/admin/cancel_order", cancelled_order);
router.get("/admin/complete_order", complete_order);
router.get("/admin/del_order", del_order);

module.exports = router;
