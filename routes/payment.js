const express = require("express");
const router = express.Router();

const {
  rapay,
  fetchallpays,
  rapaysuccesscheck,
} = require("../controller/payment");

//Paths
router.get("/admin/rapay/:amt", rapay);
router.get("/admin/fetchallpays", fetchallpays);
router.post("/admin/rapaysuccesscheck", rapaysuccesscheck);

module.exports = router;
