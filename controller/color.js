const Color = require("../models/color");

exports.addcolor = async(req,res)=>{
    const {color_name,status}  = req.body


    const newColor  = new Color({
        color_name : color_name,
        status:status
    })
    const findexist = await Color.findOne({ color_name: color_name });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
        newColor
        .save()
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newColor,
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


  
exports.viewonecolor =async(req,res)=>{
    const findone=await Color.findOne({_id:req.params.id})
    if(findone){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findone
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }
}

exports.viewallcolor =async(req,res)=>{
    const findall =await Color.find().sort({sortorder:1})
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

exports.delcolor =async(req,res)=>{
   try {
       const deleteentry=await Color.deleteOne({_id:req.params.id})
       res.status(200).json({
           status:true,
           msg:"success",
           data:deleteentry
       })

   } catch(error){
       res.status(400).json({
           status:false,
           msg:"error",
           error:error
       })
   }

}

exports.editcolor = async(req,res)=>{
    const findandUpdateEntry =await Color.findOneAndUpdate({
        _id:req.params.id
    },{$set:req.body},{new:true})
    if(findandUpdateEntry){
        res.status(200).json({
            status:true,
            msg:"success",
            data:findandUpdateEntry
        })
    }else{
        res.status(400).json({
            status:false,
            msg:"error",
            error:"error"
        })
    }
    

}
 
