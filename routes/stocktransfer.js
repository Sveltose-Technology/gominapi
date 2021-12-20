const express = require("express");
const router = express.Router();

const { addstocktransfer,delstocktransfer } = require("../controller/stocktransfer");

//Paths
router.post("/admin/addstocktransfer", addstocktransfer);
router.get("/admin/delstocktransfer/:id", delstocktransfer);

//router.post("/admin/Adminlogin", Adminlogin);

module.exports = router;
