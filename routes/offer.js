 const express = require("express")
const router =express.Router()
const { tokenverify } = require("../functions/tokenverify");


const { addOffer, Getoffer,viewoneoffer,deloffer,totalOffer,edit_offer } = require("../controller/offer");

//path

router.post ("/admin/addOffer",addOffer)
router.get ("/admin/Getoffer",Getoffer)
router.get ("/admin/viewoneoffer/:id",viewoneoffer)

router.get ("/admin/deloffer/:id",deloffer)
router.get ("/admin/totalOffer",totalOffer)
router.post("/admin/edit_offer/:id",edit_offer)




module.exports = router
