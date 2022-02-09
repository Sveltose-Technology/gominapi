const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addunits,
  editunits,
  viewoneunits,
  viewallunits,
  delunits,
  viewallunitByseller
} = require("../controller/unit");

router.post("/admin/addunits",tokenverify, addunits);
router.post("/admin/editunits/:id",tokenverify, editunits);
router.get("/admin/viewoneunits/:id",tokenverify, viewoneunits);
router.get("/admin/viewallunits", viewallunits);
router.get("/admin/viewallunitByseller",tokenverify, viewallunitByseller);

router.get("/admin/delunits/:id", delunits);

module.exports = router;
