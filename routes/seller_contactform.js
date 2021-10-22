const express = require("express");
const router = express.Router();

const {
  addcontact_form,
  getcontact_form,
} = require("../controller/seller_contactform");

//paths
router.post("/admin/addcontact_form", addcontact_form);
router.get("/admin/getcontact_form", getcontact_form);

module.exports = router;
