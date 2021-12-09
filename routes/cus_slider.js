const express = require("express");
const router = express.Router();

const {
  
    addCustomerslider,getsellerbytype,viewonecusslider,getcusSlider,delslider
} = require("../controller/cus_slider");

router.post("/admin/addCustomerslider", addCustomerslider);
router.post("/admin/getsellerbytype/:id", getsellerbytype);
router.get("/admin/viewonecusslider/:id", viewonecusslider);
router.get("/admin/getcusSlider", getcusSlider);
router.get("/admin/delslider/:id", delslider);

module.exports = router;
