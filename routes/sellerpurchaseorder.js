const express = require("express");
const router = express.Router();

const {
    addpurchaseorder,getpurchaseorder
   
} = require("../controller/sellerpurchaseorder");

// PATHS

router.post("/admin/addpurchaseorder", addpurchaseorder);
router.get("/admin/getpurchaseorder", getpurchaseorder);

 


module.exports = router;
