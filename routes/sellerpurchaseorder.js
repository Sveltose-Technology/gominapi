const express = require("express");
const router = express.Router();

const {
    addpurchaseorder,
   
} = require("../controller/sellerpurchaseorder");

// PATHS

router.post("/admin/addpurchaseorder", addpurchaseorder);
 


module.exports = router;
