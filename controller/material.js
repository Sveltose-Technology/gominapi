const Material = require("../models/material");

exports.addmaterial = async (req, res) => {
  const { materialname } = req.body;
  const newMaterial = new Material({
    materialname :materialname
  });

  const findexist = await Material.findOne({ materialname: materialname });
  if (findexist) {
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