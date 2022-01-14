const express = require("express");
const router = express.Router();

const {
    addReason,
    getReason,
    deleteReason
   
} = require("../controller/reason");

//path
router.post("/admin/addReason", addReason);
router.get("/admin/getReason", getReason);
router.get("/admin/deleteReason/:id", deleteReason);


 


module.exports = router;
