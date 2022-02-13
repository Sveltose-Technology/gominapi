const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addstockadjustment,
  delstockadjustment,
  getstockadjustment,
  getonestockadjustment,
} = require("../controller/stockadjustment");

//Paths
router.post("/admin/addstockadjustment", tokenverify, addstockadjustment);
router.get("/admin/delstockadjustment/:id", delstockadjustment);
router.get("/admin/getstockadjustment", tokenverify, getstockadjustment);
router.get(
  "/admin/getonestockadjustment/:id",
  tokenverify,
  getonestockadjustment
);

module.exports = router;
