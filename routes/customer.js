const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");


const {
  signup,
  allcustomer,
  getonecustomer,
  delcustomer,
  editcustomer,
  login,
  totalcustomer,
  sendotp,
  emailSend,
  verifyotp,
  forgotPassword,
  resetpassword,
  Customerbysellerbytoken

} = require("../controller/customer");

router.post("/user/signup", signup);
router.get("/user/allcustomer", verifytoken,allcustomer);
router.get("/user/getonecustomer",verifytoken, getonecustomer);
router.post("/user/editcustomer",verifytoken, editcustomer);
router.get("/user/delcustomer/:id", delcustomer);
router.post("/user/login", login);
router.get("/user/totalcustomer", totalcustomer);
router.post("/user/sendotp", sendotp);
router.post("/user/emailSend", emailSend);
router.post("/user/verifyotp", verifyotp);
router.post("/user/resetpassword", resetpassword);
router.get("/user/Customerbysellerbytoken",tokenverify, Customerbysellerbytoken);


module.exports = router;
