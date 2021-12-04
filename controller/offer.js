const Offer = require("../models/offer");
 
exports.addOffer = async (req, res) => {
  const {
    productId,
    sellerId,
    percentageOff,
    status,
    sortorder,
  } = req.body;

  const newOffer = new Offer({
    productId : productId,
    sellerId : sellerId,
    percentageOff: percentageOff,
    status: status,
    sortorder: sortorder,
  });
const findexist = await Offer.findone({percentageOff : percentageOff})
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


   
exports.viewoneoffer = async (req, res) => {
  //const getuser = await User.findOne({ _id: req.userId });
  const findone = await Offer.findOne({ _id: req.params.id })
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
  const findall = await Offer.find()
    .populate("product")
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
