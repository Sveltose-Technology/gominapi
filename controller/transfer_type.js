const Transfertype = require("../models/transfer_type");

exports.addTransfer_type = async (req, res) => {
  const {transfer_type} = req.body;
  const newTransfertype = new Transfertype({
    transfer_type : transfer_type
  });

  const findexist = await Transfertype.findOne({ transfer_type: transfer_type });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newTransfertype
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newTransfertype,
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
exports.getoneTransfertype = async (req, res) => {
  const findone = await Transfertype.findOne({ _id: req.params.id });
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "error",
      data: "error",
    });
  }
};

exports.getTransfertype = async (req, res) => {
  const findall = await Transfertype.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "error",
      error: "error",
    });
  }
};
exports.edittransfertype = async (req, res) => {
  const findandUpdateEntry = await Transfertype.findOneAndUpdate(
    {
      _id: req.params.id,
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
      status: "error",
      error: "error",
    });
  }
};

exports.delTransfertype = async (req, res) => {
  try {
    const deleteentry = await Transfertype.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
