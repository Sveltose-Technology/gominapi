const Subscription = require("../models/subscription");
const Seller = require("../models/seller");

exports.addSubscription = async (req, res) => {
  const { razorpay_payment_id, description, duration, sub_plan ,seller} = req.body;

  const newSubscription = new Subscription({
    razorpay_payment_id: razorpay_payment_id,
    customer: customer,
    description: description,
    duration: duration,
    sub_plan: sub_plan,
  });


////////////////////////////////////////////////////////////////



  //   //const findandexist = await Subscription.findOne({ sub_plan: sub_plan });
  //   // let datetoday = await new Date().toISOString().toString().split("T")[0].replace(/-/g, "/");

  // const getdetails = await Subscription.findOne({
  //   razorpay_payment_id: razorpay_payment_id,
  // });
  // if (getdetails) {
  //   console.log(getdetails);
    //  const getseller = await Seller.findOne({ id: req.params.seller });
    // if (getseller) {
    //   const getsub = await Seller.findOne({ id: req.getseller?.hasSubscribed });
    // if (getdetails.razorpay_payment_id) {
    //   getseller.hasSubscribed == true;
    //   console.log();
    // }


  //   if (getdetails.razorpay_payment_id == razorpay_payment_id) {
  //     const getseller = await Seller.findOne({ id: req.params.seller });
  //     const getsubscribed = await Seller.findOne({
  //       id: req.getseller?.hasSubscribed,
  //     });
  //     console.log(getseller);

  //     if (getseller.getsubscribed) {
  //       await Seller.findOneAndUpdate(
  //         {
  //           $and: [{ seller: req.sellerId }, { hasSubscribed: true }],
  //         },
  //         { new: true }
  //       );
  //       res.status(400).json({
  //         status: true,
  //         msg: "success",
  //         data: data,
  //       });
  //       console.log(getseller);
  //       console.log(getsubscribed);
  //     }
  //     console.log(getsubscribed);
  //     // }
  //     // if (getsub) {
  //     //   if (getdetails == true) console.log(getsub);
  //     // }

  //     console.log(getseller);
  //   }
  //   // console.log(getdetails);
  //   console.log(getdetails);
  // }

  //////////////////////////////////////////////


  let datetoday = await new Date()
    .toISOString()
    .toString()
    .split("T")[0]
    .replace(/-/g, "/");

  newSubscription
    .save()
    .then(async(data)=>{
      if(   data.get("razorpay_payment_id") != undefined ||
          data.get("razorpay_payment_id") != null ||
          data.get("razorpay_payment_id").length <= 0){
// console.log(data)
//let x = data.get
let x = await Seller.findOne({customer: "firstname" }) ;
// var newarr = x.map(function (value) {
//   return value.hasSubscribed
// })
//let bb = x.map(hasSubscribed)
// let z = x.hasSubscribed
 //console.log("ABC",z)


console.log("string",x)
  if(x){
    const y = await Subscription.findOneAndUpdate(
            { id: req.body.id },
            { $set: { hasSubscribed: true } },
            { new: true }
    )
    // console.log("bunny",x)
    // console.log(y)
    // console.log("true", y);
    res.status(200).json({
      status: true,
          msg: "success",
          data: x,
    })
    .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
     //     console.log(y)
    //     console.log("true", y);
  } 
      }
    })
    // res.status(200).json({
    //   status: true,
    //       msg: "success",
    //       data: x,
    // })
    // .catch((error) => {
    //     res.status(400).json({
    //       status: false,
    //       msg: "error",
    //       error: error,
    //     });
    //   });
    }
    // .then(async (data) => {

    //  if (
     
    //     data.get("razorpay_payment_id") != undefined ||
    //     data.get("razorpay_payment_id") != null ||
    //     data.get("razorpay_payment_id").length <= 0
    //   ) { 
    //       console.log("gggggg")

    //      let x = data.get("seller");
      
    //  if(x){   
      
    //  }
    
    //   }
    
    
    //  const y =    await Seller.findOneAndUpdate(
    //       //Seller.findOneAndUpdate(
    //       { seller: req.sellerId },
    //       { $set: { hasSubscribed: true } },
    //       { new: true }
    //     );
    //     console.log("bunny",x)
    //     console.log(y)
    //     console.log("true", y);
    //   }

    //   res.status(200).json({
    //     status: true,
    //     msg: "success",
    //     data: data,
    //   });
    // })
  
    // .catch((error) => {
    //   res.status(400).json({
    //     status: false,
    //     msg: "error",
    //     error: error,
    //   });
    // });
    
  // }
  // }



// exports.addSubscription = async (req,res) =>{
//   const {razorpay_payment_id,description,duration,sub_plan,seller} = req.body

//   const newSubscription = new Subscription({
//     razorpay_payment_id :razorpay_payment_id,
//     description :description,
//     seller : seller,
//     duration :duration,
//     sub_plan :sub_plan
//   })

  
//   newSubscription
//   .save()
//   .then(async(data) => {
//     if(data.get("razorpay_payment_id") != undefined || data.get("razorpay_payment_id") !=null || data.get("razorpay_payment_id") || data.get ("razorpay_payment_id").length <=0 )
// var y =await Subscription.findOneAndUpdate(
//   {id :req.params.id},
//   {$set : {hasSubscribed
//     : true}},
//   {new : true}
//   )
// console.log(y)
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: data,
//     })
//     console.log(data)
//     console.log(seller)
//   })
//   // console.log(data)
//   .catch((error) => {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: error,
//     });
//   });
// }

    // .then(async (data) => {
    //        if (
           
    //           data.get("razorpay_payment_id") != undefined ||
    //           data.get("razorpay_payment_id") != null ||
    //           data.get("razorpay_payment_id").length <= 0
    //         ) {   console.log("gggggg")
    //           // let x = data.get("seller");
    //        const y =    await Seller.findOneAndUpdate(
    //             //Seller.findOneAndUpdate(
    //             { id: req.params.id },
    //             { $set: { hasSubscribed: true } },
    //             { new: true }
    //           );
    //          // console.log(y)
    //           console.log("true", y);
    //         }
      
    //         res.status(200).json({
    //           status: true,
    //           msg: "success",
    //           data: data,
    //         });
    //       })
    //       .catch((error) => {
    //         res.status(400).json({
    //           status: false,
    //           msg: "error",
    //           error: error,
    //         });
    //       });
    //     // }
    //     // }
    //   };
      
     
exports.Getsubscription = async (req, res) => {
  const findall = await Subscription.find()
    .sort({ sortorder: 1 })
    .populate("seller");
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
  const findone = await Subscription.findOne({ _id: req.params.id }).populate(
    "seller"
  );
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
  const findone = await Subscription.findOne({ seller: req.sellerId }).populate(
    "seller"
  );
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
  const findall = await Subscription.find({ status: "Inactive" })
    .populate("seller")
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

// exports.verifyvalidategetdiscount = async (req, res) => {
//   // const {product}   = req.body
//    const findone = await Coupon.findOne({offer_code: req.params.id }).populate("product")
//   // console.log(findone)
//    let datetoday = await new Date().toISOString().toString().split("T")[0].replace(/-/g, "/");
//    if (findone) {
//      if (
//        datetoday < findone.expireOn.split("-").reverse().join("/") &&
//        datetoday > findone.startDate.split("-").reverse().join("/")
//      ) {
//       // console.log("coupon valid");
//        res.status(200).json({
//          status: true,
//          msg: "coupon valid",
//          data:findone,
//          discount_amount: findone?.amount,
//        });
//      } else {
//        res.status(200).json({
//          status: true,
//          msg: "coupon invalid"
//        });
//      }
//    } else {
//      res.status(400).json({
//        status: false,
//        msg: "error",
//     //   error: error,
//      });
//    }
//  }

exports.helthworker_status = (req, res) => {
  if (req.body.status == 1 || req.body.status == "1") {
    HealthWorker.updateOne(
      { _id: req.body._id },
      { $set: { status: "1" } },
      (err, resp) => {
        if (err) {
          res.json(err);
        } else {
          res.json(resp);
        }
      }
    );
  } else if (req.body.status == 0 || req.body.status == "0") {
    HealthWorker.updateOne(
      { _id: req.body._id },
      { $set: { status: "0" } },
      (err, resp) => {
        if (err) {
          res.json(err);
        } else {
          res.json(resp);
        }
      }
    );
  } else if (req.body.status == 2 || req.body.status == "2") {
    console.log("pending");
  }
};

// exports.addSubscription = async (req, res) => {
//   const { seller, razorpay_payment_id, description, duration, sub_plan } =
//     req.body;

//   const newSubscriptions = new Subscription({
//     razorpay_payment_id: razorpay_payment_id,
//     seller: req.sellerId,
//     description: description,
//     duration: duration,
//     sub_plan: sub_plan,
//   });

//   const finddetails = await Subscription.findOne({
//     razorpay_payment_id: razorpay_payment_id,
//   });
//   if (finddetails) {
//     console.log(finddetails);
//     const getseller = await Seller.findOne({ _id: req.params.seller });
//     if (getseller) {
//       console.log(getseller);
//     }
//     if (getseller.hasSubscribed == false) {
//       Seller.findOneAndUpdate(
//         { seller: req.sellerId },
//         { $set: { hasSubscribed: true } },
//         { new: true }
//       );
//     }
//   }
//   //   const getseller = await Seller.findOne({
//   //     _id: req.params.seller,
//   //   });
//   //   if (getseller.hasSubscribed == false) {
//   //     Seller.findOneAndUpdate(
//   //       { seller: req.sellerId },
//   //       { $set: { hasSubscribed: true } },
//   //       { new: true }
//   //     );

//   newSubscriptions
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: data,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: error,
//       });
//     });
// };
//   }
// };
