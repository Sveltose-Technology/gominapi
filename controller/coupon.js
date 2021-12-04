const Coupon = require("../models/coupon");
//const store = require("../models/store");

exports.addcoupon = async (req, res) => {
  const {
    offer_code,
    description,
    startDate,
    expireOn,
    usage_limit,
    amount,
    //discount,
    status,
  } = req.body;

  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }

  const newCoupon = new Coupon({
    offer_code: random_string,
    description: description,
    startDate: startDate,
    expireOn: expireOn,
    usage_limit: usage_limit,
    amount: amount,
    status: status,
  });
  newCoupon
    .save()
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
        msg: "coupon created",
        data: error,
      });
    });
};

exports.getcoupon = async (req, res) => {
  const findall = await Coupon.find().sort({ sortorder: 1 });
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

 

exports.delcoupon = async (req, res, next) => {
  try {
    const find_offer = await Coupon.find({});
    if (!find_offer) {
      return res.status(400).json({
        success: true,
        code: 400,
        msg: "Ooops! an error occur",
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        msg: "success",
        data: find_offer,
      });
    }
  } catch (e) {
    return res.status(500);
  }
};


exports.totalCoupon = async(req,res) =>{
  await Coupon.countDocuments().then((data)=>{
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