const Purchaseorder = require("../models/newpurchaseorder");
const Seller = require("../models/seller");

 
exports.addnewpurchaseorder = async (req, res) => {
  const {
    seller,
    supplier,
    product,
    stock_due,
    gstIn,
    payment_due,
    orderId,
    status,
    action
  } = req.body;

  create_randomString(12);
  function create_randomString(string_length) {
    (randomString = ""),
      (characters =
        "1234567890");
    for (var i, i = 0; i < string_length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }


  const newpurchaseorder = new Purchaseorder({
    seller: seller,
    supplier : supplier,
    product: product,
    stock_due :stock_due,
    gstIn :gstIn,
    payment_due:payment_due,
    orderId: randomString,
    status :   status,
     action :  action

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
    const findall = await Purchaseorder.find().populate("seller")
      .sort({ sortorder: 1 }).populate("product")
      .populate("supplier").then((data)=>{
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
  




