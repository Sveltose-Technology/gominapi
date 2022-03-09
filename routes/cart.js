const express = require("express");
const router = express.Router();
const { verifytoken } = require("../functions/verifytoken");

const {
  addtocartproduct,
  getallcart,
  removecart,
  cartbycustomer,
  editcart,
  clearCart,
  cartbycartId,
  verifygst
} = require("../controller/cart");
 
//path
router.post("/admin/add_ToCart",verifytoken, addtocartproduct);
router.get("/admin/get_allcart",verifytoken, getallcart);
router.get("/admin/remove_cart/:id",verifytoken, removecart);
router.get("/admin/cartbycustomer",verifytoken, cartbycustomer);
router.post("/admin/editcart/:id", editcart);
router.get("/admin/clearCart",verifytoken, clearCart);
router.get("/admin/cartbycartId/:id",verifytoken, cartbycartId);
router.get("/admin/verifygst",verifytoken, verifygst);

 
 
module.exports = router;


