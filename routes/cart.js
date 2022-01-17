const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");

const {
  addtocartproduct,
  getallcart,
  removecart,
  cartbycustomer,
  editcart
} = require("../controller/cart");
 
//path
router.post("/admin/add_ToCart",verifytoken, addtocartproduct);
router.get("/admin/get_allcart",verifytoken, getallcart);
router.get("/admin/remove_cart/:id", removecart);
router.get("/admin/cartbycustomer",verifytoken, cartbycustomer);
router.post("/admin/editcart/:id", editcart);

//console.log()

module.exports = router;


