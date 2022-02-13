const Gstrate = require("../models/gstrate");

exports.addgst = async (req, res) => {
  const { gst_title, value, desc } = req.body;

  const newGstrate = new Gstrate({
    gst_title: gst_title,
    value: value,
    desc: desc,
    seller: req.sellerId,
  });

  const findexist = await Gstrate.findOne({ gst_title: gst_title });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newGstrate
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newGstrate,
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

exports.viewonegst = async (req, res) => {
  const findone = await Gstrate.findOne({
    $and: [{ seller: req.sellerId }, { _id: req.params.id }],
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

exports.viewallgst = async (req, res) => {
  const findall = await Gstrate.find().sort({ sortorder: 1 });
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

exports.getgstbyseller = async (req, res) => {
  const findall = await Gstrate.find({ seller: req.sellerId }).sort({
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

exports.delgst = async (req, res) => {
  try {
    const deleteentry = await Gstrate.deleteOne({ _id: req.params.id });
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

exports.editgst = async (req, res) => {
  const findandUpdateEntry = await Gstrate.findOneAndUpdate(
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
