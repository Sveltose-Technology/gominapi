const express = require("express");
const router = express.Router();

const {addTermscondition,gettermsconditions,deltermcondition
  
} = require("../controller/termsandconditions");

router.post("/admin/addTermscondition", addTermscondition);
router.get("/admin/gettermsconditions",gettermsconditions)
router.get("/admin/deltermcondition/:id",deltermcondition)


module.exports = router;
