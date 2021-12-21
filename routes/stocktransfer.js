const express = require("express");
const router = express.Router();

const { addstocktransfer,delstocktransfer,getstocktransfer } = require("../controller/stocktransfer");

//Paths
router.post("/admin/addstocktransfer", addstocktransfer);
router.get("/admin/delstocktransfer/:id", delstocktransfer);
router.get("/admin/getstocktransfer", getstocktransfer);


//router.post("/admin/Adminlogin", Adminlogin);

module.exports = router;
