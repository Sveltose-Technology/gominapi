const express = require("express");
const router = express.Router();

const {addSubscription
  
} = require("../controller/subscription");

router.post("/admin/addSubscription", addSubscription);
 
module.exports = router;
