const express = require("express");
const router = express.Router();
const { tokenverify } = require("../functions/tokenverify");

const {
    addmaterial,getallmaterial,viewonematerial,del_material,editmaterial,getmaterialByseller
} = require("../controller/material");

router.post("/admin/addmaterial",tokenverify, addmaterial);
router.get("/admin/getallmaterial", getallmaterial);
router.get("/admin/getmaterialByseller",tokenverify, getmaterialByseller);

router.get("/admin/viewonematerial/:id",tokenverify, viewonematerial);
router.get("/admin/del_material/:id", del_material);
router.post("/admin/editmaterial/:id",tokenverify, editmaterial);


module.exports = router;


