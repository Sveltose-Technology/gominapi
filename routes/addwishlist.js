const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");

const {
  addwishlist,
  getallwishlist,
  getonewishlist,
  editwishlist,
  delonewishlist,
  clrwishlist
} = require("../controller/addwishlist");

//path
router.post("/admin/addwishlist",verifytoken, addwishlist);
router.get("/admin/getallwishlist", verifytoken, getallwishlist);
router.get("/admin/getonewishlist/:id", getonewishlist);
 router.get("/admin/editwishlist/:id", editwishlist);
router.get("/admin/delonewishlist/:id", delonewishlist);
router.get("/admin/clrwishlist/:id", clrwishlist);


module.exports = router;


 