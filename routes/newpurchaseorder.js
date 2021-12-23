const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    addnewpurchaseorder,
   
} = require("../controller/newpurchaseorder");

// PATHS

router.post("/admin/addnewpurchaseorder",tokenverify, addnewpurchaseorder);
//router.get("/admin/getpurchaseorder", getpurchaseorder);

 


module.exports = router;
