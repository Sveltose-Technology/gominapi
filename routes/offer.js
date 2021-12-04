 const express = require("express")

const router =express.Router()


const {addOffer}   = require("../controller/offer")


//path

router.get ("/admin/addOffer",addOffer)





module.exports = router