const Orderproduct = require("../models/orderproduct");
const { v4: uuidv4 } = require("uuid");

exports.addorder = async (req, res) => {
  const {
    user,
    product,
    order_type,
    customer_name,
    purchaseprice,
    reachedlocation,
    shippingdate,
    deliverdondate,
    status,
  } = req.body;

  const newOrderproduct = new Orderproduct({
    user: user,
    product: product,
    order_type: order_type,
    orderId: uuidv4(),
    customer_name: customer_name,
    purchaseprice: purchaseprice,
    reachedlocation: reachedlocation,
    shippingdate: shippingdate,
    deliverdondate: deliverdondate,
    status: status,
  });
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
        msg: "success",
        data: data,
      });
    }
  });
};
