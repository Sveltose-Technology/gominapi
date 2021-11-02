const Addwishlist = require("../models/addwishlist");
const { v4: uuidv4 } = require("uuid");

exports.addwishlist = async (req, res) => {
  const { user, product } = req.body;

  const newAddwishlist = new Addwishlist({
    user: user,
    product: product,
  });
  newAddwishlist.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    }
  });
};

// exports.getallwishlist = async (req, res) => {
//   const findall = await Cart.find().sort({ sortorder: 1 });
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: true,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

// exports.editcart = async (req, res) => {
//   const editorder = req.body;
//   console.log(editorder);
//   const findandUpdateEntry = await Cart.findOneAndUpdate(
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
//       status: "error",
//       error: "error",
//     });
//   }
// };

// exports.removecart = async (req, res) => {
//   try {
//     const deleteentry = await Cart.deleteOne({ _id: req.params.id });
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
