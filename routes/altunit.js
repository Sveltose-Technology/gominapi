const express = require("express");
const router = express.Router();

const {
  addaltunit,
  editaltunit,
  viewonealtunit,
  allaltunit,
  deletealtunit,
} = require("../controller/altunit");

//Paths
router.post("/admin/addaltunit", addaltunit);
router.post("/admin/editaltunit/:id", editaltunit);
router.get("/admin/viewonealtunit/:id", viewonealtunit);
router.get("/admin/allaltunit", allaltunit);
router.get("/admin/deletealtunit/:id", deletealtunit);

module.exports = router;
