const express = require("express");
const router = express.Router();

const {
  addtermsandcondition,
  deltermsandcondition,
  alltermsandcondition,
} = require("../controller/termsandcondition");

// router.post("/admin/addtermsandcondition", addtermsandcondition);

// router.get("/admin/get_termsandcondition", alltermsandcondition);
// router.get("/admin/deltermsandcondition/:id", deltermsandcondition);

module.exports = router;
