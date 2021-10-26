const express = require("express");
const router = express.Router();

const {
  addorder,
  getorder,
  pending_order,
  delivery_order,
  cancelled_order,
} = require("../controller/orderproduct");

// PATHS

router.post("/admin/addorder", addorder);
router.get("/admin/getorder", getorder);
router.get("/admin/pending_order", pending_order);
router.get("/admin/delivery_order", delivery_order);
router.get("/admin/cancel_order", cancelled_order);

module.exports = router;
