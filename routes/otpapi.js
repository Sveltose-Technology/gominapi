const express = require("express");
const router = express.Router();

const {
  addotpapi,
  editotpapi,
  viewoneotpapi,
  allotpapi,
  deleteotpapi,
} = require("../controller/otpapi");

//Paths
router.post("/admin/addotpapi", addotpapi);
router.post("/admin/editotpapi/:id", editotpapi);
router.get("/admin/viewoneotpapi/:id", viewoneotpapi);
router.get("/admin/allotpapi", allotpapi);
router.get("/admin/deleteotpapi/:id", deleteotpapi);

module.exports = router;
