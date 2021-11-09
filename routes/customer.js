const express = require("express");
const router = express.Router();

const {
  addcustomer,
  allcustomer,
  getonecustomer,
  delcustomer,
  editcustomer,
} = require("../controller/customer");

router.post("/user/customersignup", addcustomer);
router.get("/user/allcustomer", allcustomer);
router.get("/user/getonecustomer/:id", getonecustomer);
router.post("/user/editcustomer/:id", editcustomer);
router.get("/user/delcustomer/:id", delcustomer);

module.exports = router;
