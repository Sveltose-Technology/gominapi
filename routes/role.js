const express = require("express");
const router = express.Router();

const {
  addrole,
  allrole,
  edit_role,
  viewonerole,
  del_role,
} = require("../controller/role");

//Paths
router.post("/admin/addrole", addrole);
router.get("/admin/allrole", allrole);
router.post("/admin/edit_role/:id", edit_role);
router.get("/admin/viewonerole/:id", viewonerole);
router.get("/admin/del_role/:id", del_role);

module.exports = router;
