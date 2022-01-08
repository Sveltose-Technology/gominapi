const express = require("express");
const router = express.Router();


const { sendmail} = require("../controller/mail");

router.post("/admin/sendmail", sendmail);




module.exports = router;
