const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");

const {
  addOrder,
  orderlist,
  pending_order,
  orderbyseller,
  addordersample,
  getorderbycustomer
 } = require("../controller/orderproduct");

// PATHS

router.post("/admin/addOrder",verifytoken, addOrder);
router.get("/admin/orderlist", orderlist);
router.get("/admin/getorderbycustomer/:id", getorderbycustomer);

 
router.post("/admin/addordersample", addordersample);
router.get("/admin/pending_order",tokenverify, pending_order);
router.get("/admin/orderbyseller/:id",orderbyseller
);

module.exports = router;
 

  