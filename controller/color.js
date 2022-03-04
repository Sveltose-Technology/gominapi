const Color = require("../models/color");

exports.addcolor = async (req, res) => {
  const { colorName } = req.body;

  const newColor = new Color({
    colorName: colorName,
    seller: req.sellerId,
  });

  const findexist = await Color.findOne({ 
    $and:[{seller: req.sellerId},{colorName: colorName}]});

  if (findexist) {
    await Color.findOneAndUpdate(
      {
      $and :[
        { seller: req.sellerId },
        {colorName: colorName}
      ]
    },
    {new :true}
    )
    res.status(400).json({
      status: false,
      msg: "Already Exists",
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

exports.editcolor = async (req, res) => {
  const findandUpdateEntry = await Color.findOneAndUpdate(
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

exports.viewonecolor = async (req, res) => {
  const findone = await Color.findOne({ _id: req.params.id});
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

exports.getcolor = async (req, res) => {
  const findall = await Color.find().sort({ sortorder: 1 });
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

exports.getcolorbyseller = async (req, res) => {
  const findall = await Color.find({ seller: req.sellerId }).sort({
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

exports.deletecolor = async (req, res) => {
  try {
    const deleteentry = await Color.deleteOne({ _id: req.params.id });
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
