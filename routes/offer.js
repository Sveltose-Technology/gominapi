 const express = require("express")

const router =express.Router()


const {addOffer,Getoffer,deloffer}   = require("../controller/offer")


//path

router.post ("/admin/addOffer",addOffer)
router.get ("/admin/Getoffer",Getoffer)
router.get ("/admin/deloffer/:id",deloffer)



module.exports = router