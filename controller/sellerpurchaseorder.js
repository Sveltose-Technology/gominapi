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
   newpurchaseorder.save(function (err, data) {
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





