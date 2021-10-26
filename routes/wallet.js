const express = require("express");
const router = express.Router();

const { addwallet, getwallet } = require("../controller/wallet");

// Paths

router.post("/admin/addwallet", addwallet);
router.get("/admin/getwallet", getwallet);

module.exports = router;
