const Orderproduct = require("../models/order");
const Store = require("../models/store");
const { v4: uuidv4 } = require("uuid");
const Seller = require("../models/seller");
const Product = require("../models/product");


exports.addoderproduct = async (req, res) => {
  console.log();

  const getproduct = await Product.findOne({ _id: req.body.product});
  //console.log(getproduct)
  if (getproduct) {
    const getstore = await Store.findOne({ _id: getproduct.store });

    const {
      orderId,
      product,
      qty,
      price,
      size,
      color,
      status,
    } = req.body;

    

    const newOrderproduct = new Orderproduct({
      
      product: product,
      orderId: uuidv4(),
      qty: qty,
      price: price,
       size: size,
      color: color,
      status: status,
    });

    const findexist = await Orderproduct.findOne({
      $and: [
        { orderId: req.params.id },
        { product: product },
        { price: price },
        { qty: qty },
      ],
    });
    if (findexist) {
      await Orderproduct.findOneAndUpdate({
        $and: [
          { customer: req.userId },
          { product: product },
          { purchaseprice: purchaseprice },
          { qty: qty },
          { new: true },
        ],
      })
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
          });
        })
        .catch((error) => {
          res.status(200).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    } else {
      newOrderproduct.save(function (err, data) {
        if (err) {
          res.status(400).json({
            status: false,
            msg: "Error Occured",
            error: err,
          });
        } else {
          res.status(200).json({
            status: true,
            msg: "Product added to order",
            data: data,
          });
        }
      });
    }
  }
};
