const Material = require("../models/material");

exports.addmaterial = async (req, res) => {
  const { materialname } = req.body;
  const newMaterial = new Material({
    materialname :materialname,
    seller :req.sellerId
  });

  const findexist = await Material.findOne({
    $and:[{seller: req.sellerId},{materialname: materialname}]});
  if (findexist) {
    await Material.findOneAndUpdate(
      {
        $and :[
          { seller: req.sellerId },
          {materialname: materialname}
        ]
      },
      {new :true}
      )
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newMaterial
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newMaterial,
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


exports.editmaterial = async (req,res) =>{
  const findandUpdateEntry = await Material.findOneAndUpdate(
    {
      $and : [{seller : req.sellerId},{_id: req.params.id}]
  },{
    $set: req.body
  },
  { new : true})
  .then((data)=>{
    res.status(200).json({
      status : true,
      msg : "success",
      data : data
    })
  }).catch((error)=>{
    res.status(404).json({
      status : false,
      msg : "error",
      error : error
    })

  })
}
exports.getallmaterial = async(req,res)=>{
    const findall = await Material.find().sort({sortorder : 0})
      .then((data)=>{
        res.status(200).json({
          status : true,
          msg : "success",
          data  : data
        })
      }).catch((error)=>{
        res.status(400).json({
        status : false,
        msg : "error",
        error : error
      })
    })
}

exports.getmaterialByseller = async(req,res)=>{
  const findall = await Material.find({seller :req.sellerId}).populate("seller").sort({sortorder : 0})
    .then((data)=>{
      res.status(200).json({
        status : true,
        msg : "success",
        data  : data
      })
    }).catch((error)=>{
      res.status(400).json({
      status : false,
      msg : "error",
      error : error
    })
  })
}




exports.viewonematerial = async (req, res) => {
  const findone = await Material.findOne({ $and : [{seller : req.sellerId},{_id: req.params.id}]}).populate("seller")
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


exports.del_material = async(req, res)=>{
   try {
     const deleteentry  = await Material.deleteOne({_id : req.params.id})
     res.status(200).json({
       status : true,
       msg : "success",
       data : deleteentry
     })
   } catch(error) {
     res.status(400).json({
     status : false,
     msg : "error",
     error : error
   })
  }
}