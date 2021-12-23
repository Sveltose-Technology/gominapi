const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    addnewpurchaseorder,getpurchaseorder
   
} = require("../controller/newpurchaseorder");

// PATHS

router.post("/admin/addnewpurchaseorder", addnewpurchaseorder);
router.get("/admin/getpurchaseorder", getpurchaseorder);

 


module.exports = router;
