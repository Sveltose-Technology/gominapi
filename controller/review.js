const Review = require("../models/review");

exports.addreview = async(req,res)=>{
    const {customer,product,rating,comment}  = req.body

 
    const newReview  = new Review({
        customer: req.userId ,
        product : product,
        rating : rating,
        comment :comment
        
    })
    const alreadyReviewed = await Review.findOne({  $and: [{ customer:req.userId  }, { product: product }] });
    if (alreadyReviewed) {
      res.status(400).json({
        status: false,
        msg: "Product already reviewed",
        data: {},
      });
    } else {
        newReview
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newReview,
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


  
  exports.totalcomment = async(req,res) =>{
    await Review.countDocuments().then((data)=>{
      res.status(200).json({
        status: true,
        totalcomment: data,
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

exports.getallreview =async(req,res)=>{
    const findall =await Review.find().sort({sortorder:1}).populate("customer").populate("product")
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }

}

  exports.getonereviewproduct = async(req,res) => {
    const findall =await Review.find({product:req.params.id})
    .populate("customer").populate("product")
    if(findall){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findall
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }

  }

