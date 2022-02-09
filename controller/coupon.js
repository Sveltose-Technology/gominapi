const Coupon = require("../models/coupon");
const Seller = require("../models/seller");

exports.addcoupon = async (req, res) => {
  const {
    offer_code,
    CouponTitle,
    product,
    seller,
    description,
     
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
    seller :req.sellerId,
    offer_code: random_string,
    CouponTitle : CouponTitle,
    product : product,
    seller : req.sellerId,
    description: description,
    startDate: Date.now(),
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

exports.editcoupon = async(req,res)=>{
  const findandupdate  = await Coupon.findOneAndUpdate(
    {$and : [{seller : req.sellerId},{_id: req.params.id}]},
  {$set : req.body},
  {
    new :true
  })
  if(findandupdate){
    res.status(200).json({
      status : true,
      msg : "success",
      data : findandupdate
    })
  }else {
    res.status(400).json({
      status : false,
      error : "error",
      error : error
    })
  }
}

exports.getcoupon = async (req, res) => {
  const findall = await Coupon.find().populate("product").sort({ sortorder: 1 });
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
  const findall = await Coupon.find({seller:req.sellerId}).populate("product").populate("seller").sort({ sortorder: 1 });
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
exports.getonecoupon  = async(req,res) =>{
  const findone = await Coupon.findOne({ $and : [{seller : req.sellerId},{_id: req.params.id}]}).populate("seller").populate("product")
   if(findone){
     res.status(200).json({
       status : true,
       msg : "success",
       data : findone
     })
   }else{
     res.status(400).json({
       status :false,
       msg : "error",
       error : error
     })
   }
}

exports.getonecouponcheckvalidity  = async(req,res) =>{
  const findone = await Coupon.findOne({offer_code:req.params.id}).populate("seller").populate("product")
   if(findone){
    findone.expireOn = 12/12/2021

     res.status(200).json({
       status : true,
       msg : "success",
       data : findone
     })
   }else{
     res.status(400).json({
       status :false,
       msg : "error",
       error : error
     })
   }
}
 

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

exports.totalCoupon = async(req,res) =>{
  await Coupon.countDocuments({seller:req.sellerId}).then((data)=>{
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

// exports.varifyCoupon = async (req,res)=>{
//   const{offer_code}  = req.body


// }