const express = require("express");
const router = express.Router();

const { addorder, getorder } = require("../controller/orderproduct");

// PATHS

router.post("/admin/addorder", addorder);
router.get("/admin/getorder", getorder);

module.exports = router;
