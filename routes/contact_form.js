const express = require("express");
const router = express.Router();

const {
  addcontactform,
  allcontactform,
  delcontactform,
  viewonecontactform,
} = require("../controller/contact_form");

//path
router.post("/admin/addcontactform", addcontactform);
router.get("/admin/allcontactform", allcontactform);
router.get("/admin/delcontactform/:id", delcontactform);
router.get("/admin/viewonecontactform/:id", viewonecontactform);

module.exports = router;
