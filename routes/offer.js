 const express = require("express")
const router =express.Router()


const { addOffer, Getoffer,viewoneoffer,deloffer,totalOffer } = require("../controller/offer");

//path

router.post ("/admin/addOffer",addOffer)
router.get ("/admin/Getoffer",Getoffer)
router.get ("/admin/viewoneoffer/:id",viewoneoffer)

router.get ("/admin/deloffer/:id",deloffer)
router.get ("/admin/totalOffer",totalOffer)


module.exports = router