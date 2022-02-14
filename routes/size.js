const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addsize,
  getsize,
  deleteSize,
  viewonesize,
  editsize,
  getsizebyseller,
} = require("../controller/size");

//path
router.post("/admin/addsize", tokenverify, addsize);
router.get("/admin/getsize", getsize);
router.get("/admin/getsizebyseller", tokenverify, getsizebyseller);

router.get("/admin/viewonesize/:id", viewonesize);
router.post("/admin/editsize/:id", tokenverify, editsize);
router.get("/admin/deleteSize/:id", deleteSize);

module.exports = router;
