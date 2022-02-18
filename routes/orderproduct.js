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
  getorderbycustomer,
  getoneorderbyseller
 } = require("../controller/orderproduct");

// PATHS

router.post("/admin/addOrder",verifytoken, addOrder);
router.get("/admin/orderlist", orderlist);
router.get("/admin/getorderbycustomer",verifytoken, getorderbycustomer);

 
router.post("/admin/addordersample", addordersample);
router.get("/admin/pending_order",tokenverify, pending_order);
router.get("/admin/orderbyseller/:id",tokenverify,orderbyseller
);
router.get("/admin/getoneorderbyseller/:id",tokenverify, getoneorderbyseller);


module.exports = router;
 

  