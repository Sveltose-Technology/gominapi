// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const multer = require("multer");

// const {
//   addstore,
//   allstore,
//   viewonestore,
//   del_store,
//   edit_store,
// } = require("../controller/store");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //console.log(file);
//     let path = `./uploadesimages`;
//     if (!fs.existsSync("uploadesimages")) {
//       fs.mkdirSync("uploadesimages");
//     }
//     cb(null, path);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("jpeg") ||
//     file.mimetype.includes("png") ||
//     file.mimetype.includes("jpg")
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// let uploads = multer({ storage: storage });
// let multipleUpload = uploads.fields([
//   { name: "storeImg", maxCount: 2 },
//   { name: "shoplogo_img", maxCount: 1 },
//   { name: "gstImg", maxCount: 2 },
//   { name: "storepan_img", maxCount: 1 },
//   { name: "tradelicence_img", maxCount: 1 },
// ]);

// //Paths
// // router.post("/admin/addstore", multipleUpload, (req, res) => {
// //   if (req.files) {
// //     console.log("files uploaded");
// //     console.log(req.files);
// //   }
// // });

// router.post("/admin/addstore", multipleUpload, addstore);
// router.get("/admin/allstore", allstore);
// router.get("/admin/viewonestore/:id", viewonestore);
// router.get("/admin/del_store/:id", del_store);
// router.post("/admin/edit_store/:id", uploads.single("storeImg"), edit_store);

// module.exports = router;
