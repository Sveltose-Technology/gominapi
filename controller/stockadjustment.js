const Stockadjustment = require("../models/stockadjustment");


exports.addstockadjustment = (req,res)=>{
    const {reference_no,adjustment_date,warehouse,reason,adjusted_qty,adjusted_value} = req.body

    const newStockadjustment = new Stockadjustment({
        reference_no : reference_no,
        adjustment_date :adjustment_date,
        warehouse : warehouse,
        reason :reason ,
        adjusted_qty :adjusted_qty,
        adjusted_value :adjusted_value
    })
    newStockadjustment.save(function (err, data) {
        
        if (err) {
          res.status(400).json({
            status: false,
            msg: "error occured",
            error: err,
          });
        } else {
          res.status(200).json({
            status: true,
            msg: "success",
            data: newStockadjustment,

          });
        }
      });
    };
    
exports.delstockadjustment = async(req,res) =>{
    try {
        const deleteentry   =  await Stockadjustment.deleteOne({_id : req.params.id})
        res.status(200).json({
            status : true,
            msg : "success",
            data : deleteentry
        })
    }catch(error){
        res.status(400).json({
            status : false,
            msg : "error",
            error : error
        })
    }
}

exports.getstockadjustment = async (req, res) => {
  const findall = await Stockadjustment.find().sort({ sortorder: 1 }).populate("reason")
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

 
