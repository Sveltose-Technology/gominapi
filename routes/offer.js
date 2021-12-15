 const express = require("express")
const router =express.Router()
const { tokenverify } = require("../functions/tokenverify");


const { addOffer, Getoffer,viewoneoffer,deloffer,totalOffer,edit_offer } = require("../controller/offer");

//path

router.post ("/admin/addOffer",tokenverify,addOffer)
router.get ("/admin/Getoffer",tokenverify,Getoffer)
router.get ("/admin/viewoneoffer/:id",tokenverify,viewoneoffer)

router.get ("/admin/deloffer/:id",deloffer)
router.get ("/admin/totalOffer",totalOffer)
router.post("/admin/edit_offer/:id",tokenverify,edit_offer)



module.exports = router
