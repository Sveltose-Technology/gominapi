const Orderproduct = require("../models/orderproduct")
const Coupon = require("../models/coupon");

const { v4: uuidv4 } = require("uuid");

exports.addorder = async (req, res) => {
  const {
    customer,
    product,
    order_type,
    payment_type,
    orderId,
    qty,
    //customer_name,
    purchaseprice,
    delivery_address,
    order_date,
    // shippingdate,
    // deliverdondate,
    status,
  } = req.body;

  // const verifycoupon = await Coupon.find({CouponTitle:})


  const newOrderproduct = new Orderproduct({
    customer: customer,
    product: product,
    order_type : order_type,
    payment_type: payment_type,
    orderId: uuidv4(),
    qty: qty,
    //customer_name: customer_name,
    purchaseprice: purchaseprice,
    delivery_address: delivery_address,
    order_date: order_date,
    // shippingdate: shippingdate,
    // deliverdondate: deliverdondate, 
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


exports.getorder = async (req, res) => {
  const findall = await Orderproduct.find()
    .sort({ sortorder: 1 })
    .populate("customer")
    .populate("product");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.pending_order = async (req, res, next) => {
  const datas = await Orderproduct.find({ status: "Pending" })
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
        error: "error",
      });
    });
};

exports.delivery_order = async (req, res, next) => {
  const datas = await Orderproduct.find({ status: "Delivery" })
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
        error: "error",
      });
    });
};

exports.cancelled_order = async (req, res, next) => {
  const datas = await Orderproduct.find({ status: "Cancel" })
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
        error: "error",
      });
    });
};

exports.complete_order = async (req, res, next) => {
  const datas = await Orderproduct.find({ status: "Complete" })
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
        error: "error",
      });
    });
};


exports.del_order = async (req, res) => {
  try {
    const deleteentry = await Orderproduct.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};


exports.totalorder = async(req,res) =>{
  await Orderproduct.countDocuments().then((data)=>{
    res.status(200).json({
      status: true,
      data: data,
    });
  })
  .catch((error) => {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  })
}
