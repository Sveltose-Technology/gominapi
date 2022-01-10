const express = require("express");
const router = express.Router();


const {
  addcustomer,
  allcustomer,
  getonecustomer,
  delcustomer,
  editcustomer,
  login,
  totalcustomer,
  sendotp,
  emailSend,
  verifyotp,

} = require("../controller/customer");

router.post("/user/customersignup", addcustomer);
router.get("/user/allcustomer", allcustomer);
router.get("/user/getonecustomer/:id", getonecustomer);
router.post("/user/editcustomer/:id", editcustomer);
router.get("/user/delcustomer/:id", delcustomer);
router.post("/user/login", login);
router.get("/user/totalcustomer", totalcustomer);
router.post("/user/sendotp", sendotp);
router.post("/user/emailSend", emailSend);
router.post("/user/verifyotp", verifyotp);

module.exports = router;
//console.log()