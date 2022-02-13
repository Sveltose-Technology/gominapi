const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addstocktransfer,
  delstocktransfer,
  getstocktransfer,
  editstocktranfer,
  getonestocktransfer,
} = require("../controller/stocktransfer");

//Paths
router.post("/admin/addstocktransfer", tokenverify, addstocktransfer);
router.get("/admin/delstocktransfer/:id", delstocktransfer);
router.get("/admin/getstocktransfer", tokenverify, getstocktransfer);
router.get("/admin/getonestocktransfer/:id", tokenverify, getonestocktransfer);

router.get("/admin/editstocktranfer/:id", editstocktranfer);

//router.post("/admin/Adminlogin", Adminlogin);

module.exports = router;
