const Altunit = require("../models/altunit");

exports.addaltunit = async (req, res) => {
  const { alt_unit_title, value, desc, sortorder, status } = req.body;

  const newAltunit = new Altunit({
    alt_unit_title: alt_unit_title,
    value: value,
    desc: desc,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Altunit.findOne({ alt_unit_title: alt_unit_title });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newAltunit
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newAltunit,
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

exports.editaltunit = async (req, res) => {
  const findandUpdateEntry = await Altunit.findOneAndUpdate(
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
      msg: "error",
      error: "error",
    });
  }
};

exports.viewonealtunit = async (req, res) => {
  const findone = await Altunit.findOne({ _id: req.params.id });
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

exports.allaltunit = async (req, res) => {
  const findall = await Altunit.find().sort({ sortorder: 1 });
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

exports.deletealtunit = async (req, res) => {
  try {
    const deleteentry = await Altunit.deleteOne({ _id: req.params.id });
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
