const Offer = require("../models/offer");
 
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
    //seller : seller,
    offerTitle : offerTitle,
    percentageOff: percentageOff,
    status: status,
    sortorder: sortorder,
  });
const findexist = await Offer.findOne({product : product})
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
 
  const findall = await Offer.find().populate("product")
  //.populate("seller")
    .sort({ sortorder: 1 }).then((data)=>{
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