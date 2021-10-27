const express = require("express");
const router = express.Router();

const {
  addaboutus,
  //editaboutus,
  viewoneaboutus,
  allaboutus,
  deleteaboutus,
} = require("../controller/aboutus");

//Paths
router.post("/admin/addaboutus", addaboutus);
//router.post("/admin/editaboutus/:id", editaboutus);
router.get("/admin/viewoneaboutus/:id", viewoneaboutus);
router.get("/admin/allaboutus", allaboutus);
router.get("/admin/deleteaboutus/:id", deleteaboutus);

module.exports = router;
