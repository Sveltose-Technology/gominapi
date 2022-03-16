const Razorpay = require("razorpay");
const Payment = require("../models/payment");
var instance = new Razorpay({
  key_id: process.env.RAZARPAY_ID,
  key_secret: process.env.RAZARPAY_SECRET,
  headers: {
    "X-Razorpay-Account": "",
  },
});

exports.rapay = async (req, res) => {
  //const { Paddress } = req.body;

  let length = 6;
  let receiptname = (
    "0".repeat(length) + Math.floor(Math.random() * 10 ** length)
  ).slice(-length);

  var options = {
    amount: parseInt(req.params.amt) * 100,
    currency: "INR",
    receipt: `RCPT${receiptname}`,
  };
  console.log(options);

  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.json({
      order: order,
    });
    if (err) {
      res.json({
        err: err,
      });
    }
  });
};

exports.fetchallpays = async (req, res) => {
  instance.payments
    .all({
      from: "2021-09-29",
      to: "2021-10-01",
    })
    .then((response) => {
      res.json({
        response: response,
      });
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

exports.rapaysuccesscheck = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature,seller } =
    req.body;
    //payment_id

    //razorpay_payment_id

 // let body = razorpay_order_id + "|" + razorpay_payment_id;
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === razorpay_signature) {
    response = { signatureIsValid: "true" };

    res.status(200).json({
      status: true,
      msg: "success",
      response: response,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "signature sign failed",
    });
  }
};
