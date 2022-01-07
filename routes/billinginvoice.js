const express = require("express");
const router = express.Router();
  

const {
    addbillinginvoice,getbillinglist,viewonebilling
} = require("../controller/billinginvoice");

  

 

//Paths
router.post("/admin/addbillinginvoice", addbillinginvoice);
router.get("/admin/getbillinglist", getbillinglist);
router.get("/admin/viewonebilling/:id", viewonebilling);


 

module.exports = router;
 