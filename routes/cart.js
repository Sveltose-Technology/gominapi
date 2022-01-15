const express = require("express");
const router = express.Router();

const {
  addtocartproduct,
  getallcart,
  removecart,
  cartbycustomer,
  editcart
} = require("../controller/cart");
const { verifytoken } = require("../functions/verifytoken");

//path
router.post("/admin/add_ToCart",verifytoken, addtocartproduct);
router.get("/admin/get_allcart", getallcart);
router.get("/admin/remove_cart/:id", removecart);
router.get("/admin/cartbycustomer/:id", cartbycustomer);
router.post("/admin/editcart/:id", editcart);



module.exports = router;
