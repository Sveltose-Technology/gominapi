const Subscription = require("../models/subscription");
const Seller = require("../models/seller");
const seller = require("../models/seller");

// var today = new Date();
// var day = today.getDate();
// var month = today.getMonth();
// var year = today.getFullYear();
// today = year +"-"+ day +"-"+ month;
// var duedate = new Date(today);
// duedate.setDate(today.getDate() + 365);

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();

  return `${date}-${month}-${year}`;
};

exports.addSubscriptions = async (req, res) => {
  const t = new Date();
  var oneYr =  new Date();
 
  let qq=new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  const date1 = ("0" + qq.getDate()).slice(-2);
  const month = ("0" + (qq.getMonth() + 1)).slice(-2);
  const year = qq.getFullYear();
let det= `${date1}-${month}-${year}`
console.log("ffffff",det)
// let det= $("#yearFromNow").append(oneYr.toString());
 //console.log("1 sal bad ki date",qq)
  
  const {  razorpay_payment_id,description, duration,date, sub_plan} = req.body;
  var d = new Date();
let exod= getCurrentDate()  + 1;
//console.log(exod)


  const newSubscription = new Subscription({
    razorpay_payment_id: razorpay_payment_id,
   seller : req.sellerId,
    description: description,
    duration: duration,
    sub_plan: sub_plan,
    date :date ,
  });
// let dd=await Subscription.findOne({seller:req.sellerId})
// let val=dd.date

// ////////////////////////////////////////////////////////////////
// if(val === det){

// console.log("exod",det)
// let x = await Subscription.findOne({seller: req.sellerId }).populate("seller")
// console.log(x)
// if(x){
//   const y = await seller.findOneAndUpdate(
//           { _id:req.sellerId },
//           { $set: { hasSubscribed: false } },
//           { new: true }
//   )
// }
// }
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


 

  newSubscription
    .save()
    .then(async(data)=>{
      if(data.get("razorpay_payment_id") != undefined || data.get("razorpay_payment_id") !=null || data.get("razorpay_payment_id") || data.get //("razorpay_payment_id").length <=0 )
      )
 {
//console.log(data)
//let x = data.get
let x = await Subscription.findOne({seller: req.sellerId }).populate("seller")
console.log(x)
// var newarr = x.map(function (value) {
//   return value.hasSubscribed
// })
//let bb = x.map(hasSubscribed)
// let z = x.hasSubscribed
 //console.log("ABC",z)


console.log("string",x)
  if(x){
    const y = await seller.findOneAndUpdate(
            { _id:req.sellerId },
            { $set: { hasSubscribed: true } },
            { new: true }
    )
    // console.log("bunny",x)
     //console.log(y)
    // console.log("true", y);
    .then((data) => {
    res.status(200).json({
      status: true,
          msg: "success",
          date : det
         // date : 
        //  data: data,
        // seller:y
    })
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
    let dd=await Subscription.findOne({seller:req.sellerId})
let val=dd.date

 if(val === det){

console.log("exod",det)
let x = await Subscription.findOne({seller: req.sellerId }).populate("seller")
console.log(x)
if(x){
  const y = await seller.findOneAndUpdate(
          { _id:req.sellerId },
          { $set: { hasSubscribed: false } },
          { new: true }
  )
}
}
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


 
      
     
exports.Getsubscription = async (req, res) => {
  const findall = await Subscription.find().populate("seller")
    .sort({ sortorder: -1 })
    //.populate("seller");
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

exports.Getsubbytoken = async (req, res) => {
  const findall = await Subscription.find({seller:req.sellerId}).populate("seller")
    .sort({ sortorder: 1 })
    //.populate("seller");
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

 

 