const Size = require("../models/size");

exports.addsize = async (req, res) => {
  const { sizeName } = req.body;

  const newSize = new Size({
    sizeName: sizeName,
    seller: req.sellerId,
  });

  const findexist = await Size.findOne({ 
    $and :[{seller: req.sellerId },{sizeName:sizeName}]});
  if (findexist) {
    await Size.findOneAndUpdate(
      {
        $and : [{seller: req.sellerId},{sizeName : sizeName}]
      },
      {new : true}
    )
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newSize
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newSize,
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

exports.editsize = async (req, res) => {
  const findandUpdateEntry = await Size.findOneAndUpdate(
    {
      $and: [{ seller: req.sellerId }, { _id: req.params.id }],
    },
    { $set: req.body },
    { new: true }
  );
  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.viewonesize = async (req, res) => {
  const findone = await Size.findOne({_id: req.params.id  
  });
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

exports.getsize = async (req, res) => {
  const findall = await Size.find().sort({ sortorder: 1 });
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
exports.getsizebyseller = async (req, res) => {
  const findall = await Size.find({ seller: req.sellerId }).sort({
    sortorder: 1,
  });
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

exports.deleteSize = async (req, res) => {
  try {
    const deleteentry = await Size.deleteOne({ _id: req.params.id });
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
