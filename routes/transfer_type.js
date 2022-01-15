const express = require("express");
const router = express.Router();

const {addTransfer_type,edittransfertype,getoneTransfertype,getTransfertype,delTransfertype
   
} = require("../controller/transfer_type");

router.post("/admin/addTransfer_type", addTransfer_type);
router.post("/admin/edittransfertype/:id", edittransfertype);
router.get("/admin/getoneTransfertype/:id", getoneTransfertype);
router.get("/admin/getTransfertype", getTransfertype);
router.get("/admin/delTransfertype/:id", delTransfertype);

module.exports = router;
