const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");

const {
  addwishlist,
  getallwishlist,
  getonewishlist,
  deletewishlist,
  editwishlist,
} = require("../controller/addwishlist");

//path
//router.post("/admin/addwishlist", addwishlist);
router.get("/admin/getallwishlist", verifytoken, getallwishlist);
router.get("/admin/getonewishlist/:id", getonewishlist);
router.get("/admin/deletewishlist/:id", deletewishlist);
router.get("/admin/editwishlist/:id", editwishlist);

module.exports = router;
