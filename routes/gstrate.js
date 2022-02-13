const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addgst,
  viewonegst,
  viewallgst,
  editgst,
  delgst,
  getgstbyseller,
} = require("../controller/gstrate");

//path
router.post("/admin/addgst", tokenverify, addgst);
router.get("/admin/viewonegst/:id", tokenverify, viewonegst);
router.get("/admin/viewallgst", viewallgst);
router.get("/admin/getgstbyseller", tokenverify, getgstbyseller);

router.post("/admin/editgst/:id", tokenverify, editgst);
router.get("/admin/delgst/:id", delgst);

module.exports = router;
