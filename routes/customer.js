const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");
const { tokenverify } = require("../functions/tokenverify");


const {
  signup,
  addcustomerbyseller,
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
  Customerbysellerbytoken,
  changePassword,
  editcustomerbyseller,
  totalcustomerbyseller,
  getonecusByseller,
  viewonecustomer

} = require("../controller/customer");

router.post("/user/signup", signup);
router.post("/user/addcustomerbyseller",tokenverify, addcustomerbyseller);
router.post("/user/editcustomerbyseller/:id",tokenverify, editcustomerbyseller);

router.get("/user/allcustomer",allcustomer);
router.get("/user/viewonecustomer/:id", viewonecustomer);
router.get("/user/getonecustomer",verifytoken, getonecustomer);
router.get("/user/getonecusByseller/:id",tokenverify, getonecusByseller);

router.post("/user/editcustomer",verifytoken, editcustomer);
router.get("/user/delcustomer/:id", delcustomer);
router.post("/user/login", login);
router.get("/user/totalcustomer", totalcustomer);
router.get("/user/totalcustomerbyseller",tokenverify, totalcustomerbyseller);

router.post("/user/sendotp", sendotp);
router.post("/user/emailSend", emailSend);
router.post("/user/verifyotp", verifyotp);
router.post("/user/resetpassword", resetpassword);
router.get("/user/Customerbysellerbytoken",tokenverify, Customerbysellerbytoken);
router.post("/user/changePassword", changePassword);


module.exports = router;
 