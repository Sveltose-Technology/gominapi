// const Store = require("../models/store");

// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// const dotenv = require("dotenv");
// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// exports.addstore = async (req, res) => {
//   const {
//     store_name,
//     storeImg,
//     store_desc,
//     websiteUrl,
//     store_email,
//     phone_no,
//     altphone_no,
//     altphone_no2,
//     day,
//     startTym,
//     endTym,
//     address_line1,
//     address_line2,
//     landmark,
//     state,
//     city,
//     pincode,
//     gst_no,
//     business_type,
//     pan_no,
//     company_panno,
//     address_proof,
//     shoplogo_img,
//     gstImg,
//     storepan_img,
//     tradelicence_img,
//     sortorder,
//     status,
//   } = req.body;

//   const newStore = new Store({
//     store_name: store_name,
//     storeImg: storeImg,
//     store_desc: store_desc,
//     websiteUrl: websiteUrl,
//     store_email: store_email,
//     phone_no: phone_no,
//     altphone_no: altphone_no,
//     altphone_no2: altphone_no2,
//     day: day,
//     startTym: startTym,
//     endTym: endTym,
//     address_line1: address_line1,
//     address_line2: address_line2,
//     landmark: landmark,
//     state: state,
//     city: city,
//     pincode: pincode,
//     gst_no: gst_no,
//     business_type: business_type,
//     pan_no: pan_no,
//     company_panno: company_panno,
//     address_proof: address_proof,
//     shoplogo_img: shoplogo_img,
//     gstImg: gstImg,
//     storepan_img: storepan_img,
//     tradelicence_img: tradelicence_img,
//     sortorder: sortorder,
//     status: status,
//   });
//   if (req.files) {
//     const findexist = await Store.findOne({ phone_no: phone_no });
//     if (findexist) {
//       res.status(400).json({
//         status: false,
//         msg: "Already Exist",
//         data: {},
//       });
//     } else {
//       alluploads = [];
//       for (let i = 0; i < req.files.length; i++) {
//         const resp = await cloudinary.uploader.upload(req.files[i].path);
//         fs.unlinkSync(req.files[i].path);
//         alluploads.push(resp.secure_url);
//       }
//       //console.log(alluploads);

//       if (alluploads.length !== 0) {
//         newStore.storeImg = alluploads;
//         newStore.save().then((result) => {
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: result,
//           });
//         });
//       } else {
//         res.status(200).json({
//           status: false,
//           msg: "img not uploaded",

//         .then((data) => {
// //           res.status(200).json({
// //             status: true,
// //             msg: "success",
// //             data: data,
// //           });
// //         })
// //         .catch((error) => {
// //           res.status(400).json({
// //             status: false,
// //             msg: "error",
// //             error: error,
// //           });
// //         });
// //     }
// //   }
// // };

// exports.edit_store = async (req, res) => {
//   const {
//     storeID,
//     store_name,
//     email,
//     mobile,
//     address,
//     owner_name,
//     country,
//     state,
//     city,
//     sortorder,
//     status,
//   } = req.body;

//   data = {};
//   if (storeID) {
//     data.storeID = storeID;
//   }
//   if (store_name) {
//     data.store_name = store_name;
//   }
//   if (email) {
//     data.email = email;
//   }
//   if (mobile) {
//     data.mobile = mobile;
//   }
//   if (address) {
//     data.address = address;
//   }
//   if (owner_name) {
//     data.owner_name = owner_name;
//   }
//   if (country) {
//     data.country = country;
//   }
//   if (state) {
//     data.state = state;
//   }
//   if (city) {
//     data.city = city;
//   }

//   if (sortorder) {
//     data.sortorder = sortorder;
//   }
//   if (status) {
//     data.status = status;
//   }
//   //console.log(req.file);
//   if (req.file) {
//     const response = await cloudinary.uploader.upload(req.file.path);
//     data.store_logo = response.secure_url;
//     fs.unlinkSync(req.file.path);
//   }
//   //console.log(data);
//   if (data) {
//     const findandUpdateEntry = await Store.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       { $set: data },
//       { new: true }
//     );

//     if (findandUpdateEntry) {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: findandUpdateEntry,
//       });
//     } else {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: "error",
//       });
//     }
//   }
// };

// exports.allstore = async (req, res) => {
//   const findall = await Store.find().sort({ sortorder: 1 });
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

// exports.viewonestore = async (req, res) => {
//   const findone = await Store.findOne({ _id: req.params.id });
//   if (findone) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findone,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

// exports.del_store = async (req, res) => {
//   try {
//     const deleteentry = await Store.deleteOne({ _id: req.params.id });
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: deleteentry,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: error,
//     });
//   }
// };
