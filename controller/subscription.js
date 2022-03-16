const Subscription = require("../models/subscription");

exports.addSubscription = async (req, res) => {
 

  const {seller,razorpay_payment_id, description, duration, sub_plan,hasSubscribed } = req.body;

  const newSubscription = new Subscription({
    razorpay_payment_id:razorpay_payment_id,
     seller : req.sellerId,
    description: description,
    duration: duration,
    sub_plan: sub_plan,
    hasSubscribed : hasSubscribed,
   // payment_id:payment_id
  });
  //const findandexist = await Subscription.findOne({ sub_plan: sub_plan });
  // let datetoday = await new Date().toISOString().toString().split("T")[0].replace(/-/g, "/");

  // if (payment_id == true ) {
  //   res.status(400).json({
  //     status: false,
  //     msg: "Already Exist",
  //     data: {},
  //   });
  // } else {   
    let datetoday = await new Date().toISOString().toString().split("T")[0].replace(/-/g, "/");
    
    newSubscription
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
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
  }
//};

exports.Getsubscription = async (req, res) => {
  const findall = await Subscription.find().sort({ sortorder: 1 }).populate("seller");
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

exports.getoneSubscription = async (req, res) => {
  const findone = await Subscription.findOne({ _id: req.params.id }).populate("seller");
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


exports.getoneseller_sub = async (req, res) => {
  const findone = await Subscription.findOne({ seller: req.sellerId }).populate("seller");
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

exports.del_subscription = async (req, res) => {
  try {
    const deleteentry = await Subscription.deleteOne({ _id: req.params.id });
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

exports.total_sub = async (req, res) => {
  await Subscription.countDocuments()
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

exports.subscribedplan = async (req, res) => {
  const findall = await Subscription.find({ status: "Inactive" }).populate("seller")
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
