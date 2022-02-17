const Ordertable = require("../models/orderproduct");
const { v4: uuidv4 } = require("uuid");
const Seller = require("../models/seller");
const Product = require("../models/product");
const Store = require("../models/store");
const Cart = require("../models/cart");


exports.addOrder = async (req, res) => {
  const { product, product_qty, product_size, product_color, payment_type, status, orderId, cus_orderId, seller_orderId, cartID } = req.body

  const cartitem = await Store.Cart({ _id: cartID })
  const getstore = await Store.findOne({ product: req.params.id })
  if (getstore && cartitem) {
    const getproduct = await Product.findOne({ _id: req.body.product });
    if (getproduct) {
      const getstore = await Store.findOne({ _id: getproduct.store });
      const newOrdertable = new Ordertable({
        seller: getstore?.seller,
        customer: req.userId,
        product: cartitem.product,
        product_qty: cartitem.product_qty,
        product_size: cartitem.size,
        product_color: cartitem.color,
        payment_type: payment_type,
        status: "Pending",
        orderId: uuidv4(),
        cus_orderId: "#ORDC" + Date.now(),
        seller_orderId: "#ORDS" + Date.now()
      })
      const findexist = await Ordertable.findOne({
        $and: [
          { customer: req.userId },
          { seller: getstore?.seller },
          { product: product },
          { product_qty: product_qty },
          { product_size: product_size },
          { product_color: product_color },
        ],
      });
      if (findexist) {
        await Orderproduct.findOneAndUpdate({
          $and: [
            { customer: req.userId },
            { seller: getstore?.seller },
            { product: product },
            { product_qty: product_qty },
            { product_size: product_size },
            { product_color: product_color },
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
        newOrdertable.save(function (err, data) {
          if (err) {
            res.status(400).json({
              status: false,
              msg: "Error Occured",
              error: err,
            });
          } else {
            res.status(200).json({
              status: true,
              msg: "Product added to Order",
              data: data,
            });
          }
        });
      }
    }
  }
}

exports.addordersample = async (req, res) => {

  const cartitem = await Cart.find({ _id: req.body.cart })
  const finalarray = [];
  let total_qty = 0
  let total_price = 0
  const cus_orderId = "#ORDC" + Date.now();
  for (let index = 0; index < cartitem.length; index++) {
    let element = {}
    element.product = cartitem[index].product;
    element.customer = cartitem[index].customer;
    element.product_price = cartitem[index].product_price;
    element.product_qty = cartitem[index].product_qty;
    total_qty = total_qty + cartitem[index].product_qty
    total_price = total_price + cartitem[index].product_price
    element.color = cartitem[index].color;
    element.size = cartitem[index].size;
    element.payment_type = req.body.payment_type;
    element.status = req.body.status;
    element.cus_orderId = cus_orderId;
    element.shipping_address = req.body.shipping_address;
 
    console.log(element)
    finalarray.push(element)
  }
  
 
  //console.log(finalarray)
  await Ordertable.insertMany(finalarray).then((data) => {
    res.json({
      status: true,
      msg: "Product added to Order",
      data: data,
      orderId: cus_orderId,
      total_qty: total_qty,
      total_price: total_price,
    })
  }).catch((error) => {
    res.json(error)
  })
  
}

exports.orderbysellerbytoken = async (req, res) => {
  const getstore = await Store.findOne({ product: req.params.id });

  const findone = await Ordertable.find({ id: req.sellerId })
    .populate("product")
    .populate("customer")
    //.populate("delivery_address")
    .populate("seller");
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

 

exports.orderlist = async (req, res) => {
  const findall = await Ordertable.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};


exports.pending_order = async (req, res, next) => {
  const finddetails = await Ordertable.find({
    $and: [{ seller: req.sellerId }, { status: "Pending" }],
  })
    .populate("customer")
    .populate("product")
    .then((result) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};


exports.updateOrderStatus = (req, res) => {
  Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(order);
  });
};
