const Units = require("../models/unit");

exports.addunits = async (req, res) => {
  const { units_title, value, desc, sortorder, status } = req.body;
  const newUnits = new Units({
    units_title: units_title,
    value: value,
    desc: desc,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Units.findOne({ units_title: units_title });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else {
    newUnits
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newUnits,
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
exports.viewoneunits = async (req, res) => {
  const findone = await Units.findOne({ _id: req.params.id });
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

exports.viewallunits = async (req, res) => {
  const findall = await Units.find().sort({ sortorder: 1 });
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
exports.editunits = async (req, res) => {
  const findandUpdateEntry = await Units.findOneAndUpdate(
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

exports.delunits = async (req, res) => {
  try {
    const deleteentry = await Units.deleteOne({ _id: req.params.id });
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
