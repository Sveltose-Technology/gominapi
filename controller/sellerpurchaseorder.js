const Purchaseorder = require("../models/sellerpurchaseorder");
const { v4: uuidv4 } = require("uuid");

exports.addpurchaseorder = async (req, res) => {
  const {
    seller,
    product,
    qty,
    orderId,
    purchaseprice,
  } = req.body;

  const newpurchaseorder = new Purchaseorder({
    seller: seller,
    product: product,
    orderId: uuidv4(),
    qty: qty,
    purchaseprice: purchaseprice,
   });
   newpurchaseorder.save().then((data)=>{
       res.status(200).json({
           status : true,
           msg : "successfully Order",
           data : data
       })
   })
   .catch((error)=>{
       res.status(400).json({
           status : false,
           msg : "error",
           error : error
       })
   })
   
};

// exports.getorder = async (req, res) => {
//     const findall = await Purchaseorder.find()
//       .sort({ sortorder: 1 })
//       .populate("seller")
//       .populate("product");
//     if (findall) {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: findall,
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         msg: "error",
//         error: "error",
//       });
//     }
//   };
  



