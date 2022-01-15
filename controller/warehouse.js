const Warehouse = require("../models/warehouse")

exports.addwarehouse = async (req,res)=>{
    const {warehousename,address1,address2,city,pin,phone_no,email} = req.body

    const newWarehouse = new Warehouse({
        warehousename :warehousename,
        address1 :address1,
        address2 : address2 ,
        city : city,
        pin : pin,
        phone_no : phone_no,
        email : email
    })
    newWarehouse.save().then((data)=>{
        res.status(200).json({
            status : true,
            msg : "success",
            data : data
        })
    }).catch((error)=>{
        res.status(400).json({
            status : false,
            error : "error",
            error : error
        })
    })

}

exports.editwarehouse = async(req,res)=>{
    const findandUpdateEntry = await Warehouse.findOneAndUpdate(
        {
            _id : req.params.id
         },
         {$set : req.body},
         {new : true}
    ).then((data)=>{
        res.status(200).json({
            status : true,
            msg : "success",
            data : data
        })
    }).catch((error)=>{
        res.status(400).json({
            status : false,
            msg : "error",
            error : error
        })
    })
}

exports.getwarehouse = async (req,res)=>{
    const findall = await Warehouse.find().sort({sortorer : 1})
    .then((data)=>{
        res.status(200).json({
            status : true,
            msg : "success",
            data : data
        })
    }).catch((error)=>{
        res.status(400).json({
            status : false,
            msg : "error",
            error : error
        })
    })
}


exports.getonewarehouse = async (req,res)=>{
    const findone = await Warehouse.findOne({_id : req.params.id})
    .then((data)=>{
        res.status(200).json({
            status : true,
            msg : "success",
            data : data
        })
    }).catch((error)=>{
        res.status(400).json({
            status :false,
            msg : "error",
            error : error
        })
    })
}

exports.del_warehouse = async (req, res) => {
    try {
      const deleteentry = await Warehouse.deleteOne({ _id: req.params.id });
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
  