const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    addnewpurchaseorder,getpurchaseorder,editnewpurchaseorder,getonepurchaseorder,delpurchaseorder
   
} = require("../controller/newpurchaseorder");

// PATHS

router.post("/admin/addnewpurchaseorder", addnewpurchaseorder);
router.get("/admin/getpurchaseorder", getpurchaseorder);
router.post("/admin/editnewpurchaseorder/:id", editnewpurchaseorder);
router.get("/admin/getonepurchaseorder/:id", getonepurchaseorder);
router.get("/admin/delpurchaseorder/:id", delpurchaseorder);




 


module.exports = router;
