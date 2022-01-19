const express = require("express");
const router = express.Router();

const {addSubscription,Getsubscription,getoneSubscription,del_subscription,total_sub
  
} = require("../controller/subscription");

router.post("/admin/addSubscription", addSubscription);
router.get("/admin/Getsubscription", Getsubscription);
router.get("/admin/getoneSubscription/:id", getoneSubscription);
router.get("/admin/del_subscription/:id", del_subscription);
router.get("/admin/total_sub", total_sub);


module.exports = router;