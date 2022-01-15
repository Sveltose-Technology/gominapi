const express = require("express");
const router = express.Router();

const {
    addgst,
    viewonegst,
  viewallgst,
   editgst,
 delgst,
} = require("../controller/gstrate");

//path
router.post("/admin/addgst", addgst);
router.get("/admin/viewonegst/:id", viewonegst);
 router.get("/admin/viewallgst", viewallgst);
 router.post("/admin/editgst/:id", editgst);
router.get("/admin/delgst/:id", delgst);

module.exports = router;
