const Termsandcondition = require("../models/termsandconditions")


exports.addTermscondition = async(req,res)=>{
    const{description} = req.body

    const newTermsandcondition = new Termsandcondition({
        description : description
    })
    newTermsandcondition.save(function(err,data){
        if(err){
            res.status(400).json({
                status :false,
                msg:"Error Occured",
                error : err
            })
        }else{
            res.status(200).json({
                status : true,
                msg : "Success",
                data : data
            })
        }
    })

}


exports.gettermsconditions = async(req,res)=>{
    const findall = await Termsandcondition.find().sort({sortorder :1})
    if(findall){
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
}



exports.deltermcondition = async (req, res) => {
    try {
      const deleteentry = await Termsandcondition.deleteOne({
        _id: req.params.id,
      })
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
  