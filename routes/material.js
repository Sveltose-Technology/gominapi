const express = require("express");
const router = express.Router();

const {
    addmaterial,getallmaterial
} = require("../controller/material");

router.post("/admin/addmaterial", addmaterial);
router.get("/admin/getallmaterial", getallmaterial);

  

module.exports = router;
