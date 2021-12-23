const Purchaseorder = require("../models/newpurchaseorder");
const Seller = require("../models/seller");

const { v4: uuidv4 } = require("uuid");

exports.addnewpurchaseorder = async (req, res) => {
  const {
    seller,
    supplier,
    product,
    stock_due,
    gstIn,
    payment_due,
    orderId
  } = req.body;

  const newpurchaseorder = new Purchaseorder({
    seller: req.sellerId,
    supplier : supplier,
    product: product,
    stock_due :stock_due,
    gstIn :gstIn,
    payment_due:payment_due,
    orderId: uuidv4()
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

exports.getpurchaseorder = async (req, res) => {
    const findall = await Purchaseorder.find({seller:req.sellerId})
      .sort({ sortorder: 1 }).populate("product")
      .populate("seller").then((data)=>{
          res.status(200).json({
              status : true,
              msg : "success",
              
              data : data
              
          })
      }).catch((error)=>{
          res.status(400).json({
              status : false,
              msg : "error",
              error : error
          })
      })
     
  };
  




