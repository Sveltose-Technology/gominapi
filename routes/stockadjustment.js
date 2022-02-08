const express = require("express");
const router = express.Router();

const { addstockadjustment,delstockadjustment,getstockadjustment,getonestockadjustment } = require("../controller/stockadjustment");

//Paths
router.post("/admin/addstockadjustment", addstockadjustment);
router.get("/admin/delstockadjustment/:id", delstockadjustment);
router.get("/admin/getstockadjustment", getstockadjustment);
router.get("/admin/getonestockadjustment/:id", getonestockadjustment);
 
 
module.exports = router;
