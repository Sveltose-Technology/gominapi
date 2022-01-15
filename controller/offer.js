const Offer = require("../models/offer");
const Seller = require("../models/seller");

 
exports.addOffer = async (req, res) => {
  const {
    product,
    //seller,
    offerTitle,
    percentageOff,
    status,
    sortorder,
  } = req.body;


  const newOffer = new Offer({
    product : product,
    seller : req.sellerId,
    offerTitle : offerTitle,
    percentageOff: percentageOff,
    status: status,
    sortorder: sortorder,
  });
const findexist = await Offer.findOne({offerTitle : offerTitle})
  if(findexist){
res.status(400).json({
      status: false,
      msg : "Already Exist",
      data : {}

})
  }else{
    newOffer.save().then((data)=>{
      res.status(200).json({
        status : true,
        msg : "success",
        data : data
      })
    }).catch((error)=>{
      res.status(400).json({
        status : false,
        msg : "error",
        error :error
      })
    })
  }
}

exports.edit_offer = async (req, res) => {
  const findandUpdateEntry = await Offer.findOneAndUpdate(
      {
          _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
  );
  if (findandUpdateEntry) {
      res.status(200).json({
          status: true,
          msg: "success",
          data: findandUpdateEntry,
      });
  } else {
      res.status(400).json({
          status: false,
          msg: "error",
          error: "error",
      });
  }
};
   
exports.viewoneoffer = async (req, res) => {
  //const getoneseller = await Seller.findOne({_id : req.sellerId})
   const findone = await Offer.findOne({ seller:req.sellerId }).populate("product")
 .populate("seller")
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

exports.Getoffer = async (req, res) => {
  //const getseller= await Seller.findOne({ _id: req.sellerId });

  const findall = await Offer.find({seller:req.sellerId}).populate("product")
  .populate("seller")
    .sort({ sortorder: 1 }).then((data)=>{
      res.status(200).json({
        status: true,
        data: data
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
   
exports.deloffer = async (req, res) => {
  try {
    const deleteentry = await Offer.deleteOne({ _id: req.params.id });
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


exports.totalOffer = async(req,res) =>{
  await Offer.countDocuments().then((data)=>{
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