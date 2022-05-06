const Coupon = require("../models/coupon");
const Seller = require("../models/seller");

exports.addcoupon = async (req, res) => {
  const {
    product,
    offer_code,
    coupon_title,
    description,
    startDate,
    expireOn,
    amount,
    status,
  } = req.body;
  const newCoupon = new Coupon({
    product:product,
    seller :req.sellerId,
    offer_code: offer_code,
    coupon_title: coupon_title,
    description: description,
    startDate: startDate,
    expireOn: expireOn,
    amount: amount,
    status: status,
  });
  const findexist = await Coupon.findOne({ 
    $and:[{seller: req.sellerId},{coupon_title: coupon_title}]});

  if (findexist) {
    await Coupon.findOneAndUpdate(
      {
      $and :[
        { seller: req.sellerId },
        {coupon_title: coupon_title}
      ]
    },
    {new :true}
    )
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newCoupon
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newCoupon,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};
exports.editcoupon = async (req, res) => {
  const findandupdate = await Coupon.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    {
      new: true,
    }
  );
  if (findandupdate) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandupdate,
    });
  } else {
    res.status(400).json({
      status: false,
      error: "error",
      error: error,
    });
  }
};

exports.getcoupon = async (req, res) => {
  const findall = await Coupon.find()
    .sort({ sortorder: 1 });
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

exports.getcouponbyseller = async (req, res) => {
  const findall = await Coupon.find({ seller: req.sellerId }).populate("product")
    .sort({ sortorder: 1 });
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

exports.getonecoupon = async (req, res) => {
  const findone = await Coupon.findOne({ _id: req.params.id });
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
      error: error,
    });
  }
};

exports.verifyvalidategetdiscount = async (req, res) => {
 // const {product}   = req.body
  const findone = await Coupon.findOne({offer_code: req.params.id }).populate("product")
 // console.log(findone)
  let datetoday = await new Date().toISOString().toString().split("T")[0].replace(/-/g, "/");
  if (findone) {
    if (
      datetoday < findone.expireOn.split("-").reverse().join("/") &&
      datetoday > findone.startDate.split("-").reverse().join("/")
    ) {
     // console.log("coupon valid");
      res.status(200).json({
        status: true,
        msg: "coupon valid",
        data:findone,
        discount_amount: findone?.amount,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "coupon invalid"
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
   //   error: error,
    });
  }
};

exports.delcoupon = async (req, res) => {
  try {
    const deleteentry = await Coupon.deleteOne({ _id: req.params.id });
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

exports.totalCoupon = async (req, res) => {
  await Coupon.countDocuments({ seller: req.sellerId })
    .then((data) => {
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
    });
};

exports.gettotalcoupon = async (req, res) => {
  await Coupon.countDocuments()
    .then((data) => {
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
    });
};


 