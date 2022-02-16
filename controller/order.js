// const Order = require("../models/order");

// exports.addOrder = async (req, res) => {
//   const { order_type,payment_type,delivery_address,shipping_date} = req.body;

//   const newOrder = new Order({
//     order_type : order_type,
//     payment_type :payment_type,
//     delivery_address : delivery_address,
//     shipping_date:shipping_date
//   });
//   newOrder
//       .save()
//       .then(
//         res.status(200).json({
//           status: true,
//           msg: "success",
//           data: newOrder,
//         })
//       )
//       .catch((error) => {
//         res.status(400).json({
//           status: false,
//           msg: "error",
//           error: error,
//         });
//       });
  
// };

// exports.editReason = async (req, res) => {
//   const findandUpdateEntry = await Reason.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: req.body },
//     { new: true }
//   );
//   if (findandUpdateEntry) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findandUpdateEntry,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

// exports.viewoneorder = async (req, res) => {
//   const findone = await Reason.findOne({ _id: req.params.id });
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

// exports.getorder = async (req, res) => {
//   const findall = await Reason.find().sort({ sortorder: 1 });
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

// exports.deleteReason = async (req, res) => {
//   try {
//     const deleteentry = await Reason.deleteOne({ _id: req.params.id });
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


// // CONSOLE