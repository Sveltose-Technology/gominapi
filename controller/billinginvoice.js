const Billinginvoice = require("../models/billinginvoice");
 

exports.addbillinginvoice = async (req, res) => {
  const {
    customer,
    customer_name,
    customer_phone,
    customer_email,
    product,
  } = req.body;

  let total_qty = 0;
  for (let i = 0; i < product.length; i++) {
    total_qty = total_qty + product[i].qty;
  }

  let total_amount = 0;
  for (let i = 0; i < product.length; i++) {
    total_amount =total_amount + product[i].amount;
   }

  //  sum = sum + amount * qty;

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

  const newBillinginvoice = new Billinginvoice({
    orderId : randomString,
    customer :customer,
    customer_name :customer_name,
    customer_phone :customer_phone,
    customer_email :customer_email,
    total_qty: total_qty,
    total_amount: total_amount,
    product : product,
  });
  newBillinginvoice.save().then((data) => {
    res.status(200).json({
      status: true,
      msg: "success",
      data: data,
      // grand_total:sum
    })
  })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error
      })
    })

};

exports.getbillinglist = async (req, res) => {
  const findall = await Billinginvoice.find().populate("product")
    .sort({ sortorder: 1 }).then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",

        data: data

      })
    }).catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error
      })
    })

};


exports.viewonebilling = async (req, res) => {
  const findone = await Billinginvoice.findOne({ _id: req.params.id }).populate("product")
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


