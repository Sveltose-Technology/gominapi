const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
  addrole,
  allrole,
  edit_role,
  viewonerole,
  del_role,
} = require("../controller/role");

//Paths
router.post("/admin/addrole",tokenverify, addrole);
router.get("/admin/allrole",tokenverify, allrole);
router.post("/admin/edit_role/:id", edit_role);
router.get("/admin/viewonerole",tokenverify, viewonerole);
router.get("/admin/del_role/:id", del_role);

module.exports = router;
