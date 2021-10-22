const express = require("express");
const router = express.Router();

const {
  adduser,
  sendotp,
  alluser,
  deleteuser,
  verifyotp,
} = require("../controller/user");

//Paths
router.post("/user/signup", adduser);
//router.post("/user/Adminlogin", Adminlogin);
router.get("/user/alluser", alluser);
router.get("/user/deleteuser/:id", deleteuser);
router.post("/user/sendotp", sendotp);
router.post("/user/verifyotp", verifyotp);
module.exports = router;
