const express = require("express");
const router = express.Router();

const {
  addprivacypolicy,
  delprivacypolicy,
  allprivacy_policy,
} = require("../controller/privacypolicy");

router.post("/admin/addprivacy_policy", addprivacypolicy);
router.get("/admin/allprivacy_policy", allprivacy_policy);
router.get("/admin/delprivacypolicy/:id", delprivacypolicy);

module.exports = router;
