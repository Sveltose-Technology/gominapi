const express = require("express");
const router = express.Router();

const {addTermscondition,gettermsconditions
  
} = require("../controller/termsandconditions");

router.post("/admin/addTermscondition", addTermscondition);
router.get("/admin/gettermsconditions",gettermsconditions)
 

module.exports = router;
