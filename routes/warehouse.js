const express = require("express")
const router = express.Router()

const{addwarehouse,getwarehouse,getonewarehouse,editwarehouse}   = require("../controller/warehouse");



//paths

router.post("/admin/addwarehouse",addwarehouse)
router.get("/admin/editwarehouse/:id",editwarehouse)

router.get("/admin/getwarehouse",getwarehouse)
router.get("/admin/getonewarehouse/:id",getonewarehouse)




module.exports = router