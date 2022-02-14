const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addReason,
  getReason,
  editReason,
  deleteReason,
} = require("../controller/reason");

//path

router.post("/admin/addReason", tokenverify, addReason);
router.get("/admin/getReason", tokenverify, getReason);
router.post("/admin/editReason/:id", tokenverify, editReason);

router.get("/admin/deleteReason/:id", deleteReason);

module.exports = router;
 
