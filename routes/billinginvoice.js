const express = require("express");
const router = express.Router();
  

const {
    addbillinginvoice,getbillinglist
} = require("../controller/billinginvoice");

  

 

//Paths
router.post("/admin/addbillinginvoice", addbillinginvoice);
router.get("/admin/getbillinglist", getbillinglist);

 

module.exports = router;
 