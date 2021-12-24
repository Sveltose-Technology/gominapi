const express = require("express");
const router = express.Router();

const {
    addcolor,viewonecolor,viewallcolor,delcolor,editcolor
} = require("../controller/color");



// Paths
router.post("/admin/addcolor", addcolor);
router.get("/admin/viewonecolor/:id", viewonecolor);
router.get("/admin/viewallcolor", viewallcolor);
router.get("/admin/delcolor/:id", delcolor);
router.post("/admin/editcolor/:id", editcolor);




module.exports = router;


