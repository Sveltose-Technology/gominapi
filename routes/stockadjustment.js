const express = require("express");
const router = express.Router();

const { addstockadjustment,delstockadjustment } = require("../controller/stockadjustment");

//Paths
router.post("/admin/addstockadjustment", addstockadjustment);
router.get("/admin/delstockadjustment/:id", delstockadjustment);

 
module.exports = router;
