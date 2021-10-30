const express = require("express");
const router = express.Router();

const {
  addtermsandcondition,
  deltermsandcondition,
  alltermsandcondition,
} = require("../controller/termsandcondition");

router.post("/admin/addtermsandcondition", addtermsandcondition);
// router.post("/admin/editunits/:id", editunits);
// router.get("/admin/viewoneunits/:id", viewoneunits);
router.get("/admin/get_termsandcondition", alltermsandcondition);
router.get("/admin/deltermsandcondition/:id", deltermsandcondition);

module.exports = router;
