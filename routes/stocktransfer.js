const express = require("express");
const router = express.Router();

const { addstocktransfer,delstocktransfer,getstocktransfer,editstocktranfer,getonestocktransfer } = require("../controller/stocktransfer");

//Paths
router.post("/admin/addstocktransfer", addstocktransfer);
router.get("/admin/delstocktransfer/:id", delstocktransfer);
router.get("/admin/getstocktransfer", getstocktransfer);
router.get("/admin/getonestocktransfer/:id", getonestocktransfer);

router.get("/admin/editstocktranfer/:id", editstocktranfer);



//router.post("/admin/Adminlogin", Adminlogin);

module.exports = router;
