const express = require("express");
const router = express.Router();

const { addwishlist,getallwishlist,getonewishlist,deletewishlist } = require("../controller/addwishlist");

//path
router.post("/admin/addwishlist", addwishlist);
router.get("/admin/getallwishlist", getallwishlist);
router.get("/admin/getonewishlist/:id", getonewishlist);
router.get("/admin/deletewishlist/:id", deletewishlist);



module.exports = router;
