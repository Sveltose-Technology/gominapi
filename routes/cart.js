const express = require("express");
const router = express.Router();

const {
  addtocartproduct,
  getallcart,
  removecart,
  cartbyshow,
  editcart
} = require("../controller/cart");

//path
router.post("/admin/add_ToCart", addtocartproduct);
router.get("/admin/get_allcart", getallcart);
router.get("/admin/remove_cart/:id", removecart);
router.get("/admin/cartbyshow/:id", cartbyshow);
router.post("/admin/editcart/:id", editcart);



module.exports = router;
