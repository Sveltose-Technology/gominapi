const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");


const {
    addnewpurchaseorder,getpurchaseorder,editnewpurchaseorder,getonepurchaseorder,delpurchaseorder
   
} = require("../controller/newpurchaseorder");

// PATHS

router.post("/admin/addnewpurchaseorder",tokenverify, addnewpurchaseorder);
router.get("/admin/getpurchaseorder",tokenverify, getpurchaseorder);
router.post("/admin/editnewpurchaseorder/:id",tokenverify, editnewpurchaseorder);
router.get("/admin/getonepurchaseorder/:id",tokenverify, getonepurchaseorder);
router.get("/admin/delpurchaseorder/:id", delpurchaseorder);




 


module.exports = router;
