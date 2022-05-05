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
  getoneorderbyseller,
  updateOrderStatusbyseller,
  totalorder,
  deleteOrder,
  salesbyseller,
  totalorderbySeller,
  salesbyitem,
  sellerinvoice_icm,
  } = require("../controller/orderproduct");

// PATHS

router.post("/admin/addOrder",verifytoken, addOrder);
router.get("/admin/orderlist", orderlist);
router.get("/admin/getorderbycustomer",verifytoken, getorderbycustomer);

 
router.post("/admin/addordersample", verifytoken,addordersample);
router.get("/admin/pending_order",tokenverify, pending_order);
router.get("/admin/orderbyseller",tokenverify,orderbyseller);
router.get("/admin/salesbyseller",tokenverify,salesbyseller);
router.post("/admin/salesbyitem",tokenverify,salesbyitem);

router.get("/admin/getoneorderbyseller/:id",tokenverify, getoneorderbyseller);
router.post("/admin/updateOrderStatusbyseller/:id",tokenverify, updateOrderStatusbyseller);
router.get("/admin/totalorder",totalorder);
router.get("/admin/deleteOrder/:id", deleteOrder);
router.get("/admin/totalorderbySeller",tokenverify, totalorderbySeller);
router.get("/admin/sellerinvoice_icm",tokenverify, sellerinvoice_icm);
 
 

module.exports = router;
 

 