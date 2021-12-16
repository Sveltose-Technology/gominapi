const express = require("express")
const router = express.Router()

const{addwarehouse,getwarehouse,getonewarehouse,editwarehouse,del_warehouse}   = require("../controller/warehouse");



//paths

router.post("/admin/addwarehouse",addwarehouse)
router.post("/admin/editwarehouse/:id",editwarehouse)
router.get("/admin/del_warehouse/:id",del_warehouse)
router.get("/admin/getwarehouse",getwarehouse)
router.get("/admin/getonewarehouse/:id",getonewarehouse)





module.exports = router