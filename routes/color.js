const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addcolor,
  getcolor,
  editcolor,
  viewonecolor,
  deletecolor,
  getcolorbyseller,
} = require("../controller/color");

//path
router.post("/admin/addcolor", tokenverify, addcolor);
router.post("/admin/editcolor/:id", tokenverify, editcolor);
router.get("/admin/getcolor", getcolor);
router.get("/admin/getcolorbyseller", tokenverify, getcolorbyseller);

router.get("/admin/viewonecolor/:id", viewonecolor);
router.get("/admin/deletecolor/:id", deletecolor);

module.exports = router;
