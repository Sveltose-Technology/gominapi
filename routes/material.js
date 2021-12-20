const express = require("express");
const router = express.Router();

const {
    addmaterial,getallmaterial,viewonematerial,del_material,editmaterial
} = require("../controller/material");

router.post("/admin/addmaterial", addmaterial);
router.get("/admin/getallmaterial", getallmaterial);
router.get("/admin/viewonematerial/:id", viewonematerial);
router.get("/admin/del_material/:id", del_material);
router.post("/admin/editmaterial/:id", editmaterial);


module.exports = router;
