const Reason = require("../models/reason");

exports.addReason = async (req, res) => {
  const { reason } = req.body;

  const newReason = new Reason({
    reason: reason,
    seller: req.sellerId,
  });
  newReason
    .save()
    .then(
      res.status(200).json({
        status: true,
        msg: "success",
        data: newReason,
      })
    )
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.editReason = async (req, res) => {
  const findandUpdateEntry = await Reason.findOneAndUpdate(
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

exports.viewonereason = async (req, res) => {
  const findone = await Reason.findOne({
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

exports.getReason = async (req, res) => {
  const findall = await Reason.find({ seller: req.sellerId }).sort({
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

exports.deleteReason = async (req, res) => {
  try {
    const deleteentry = await Reason.deleteOne({ _id: req.params.id });
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
