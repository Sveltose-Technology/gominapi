 const Stocktransfer = require("../models/stocktransfer");


exports.addstocktransfer = (req,res)=>{
    const {reference_no,from_warehouse,to_warehouse,transfer_date,delivery_duedate,transfer_type,reason} = req.body

    const newStocktransfer = new Stocktransfer({
        reference_no : reference_no,
        from_warehouse :from_warehouse,
        to_warehouse : to_warehouse,
        transfer_date :transfer_date,
        delivery_duedate :delivery_duedate,
        transfer_type : transfer_type,
        reason :reason 

    })
    newStocktransfer.save(function (err, data) {
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
            data: newStocktransfer,
          });
        }
      });
    };
    
exports.delstocktransfer = async(req,res) =>{
    try {
        const deleteentry   =  await Stocktransfer.deleteOne({_id : req.params.id})
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


 
exports.getstocktransfer = async (req, res) => {
  const findall = await Stocktransfer.find().sort({ sortorder: 1 });
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



