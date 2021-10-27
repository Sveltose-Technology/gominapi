const Aboutus = require("../models/aboutus");

exports.addaboutus = async (req, res) => {
  const { aboutus_title, display, sortorder, status } = req.body;

  const newAboutus = new Aboutus({
    aboutus_title: aboutus_title,
    display: display,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Aboutus.findOne({ aboutus_title: aboutus_title });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newAboutus
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newAboutus,
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

exports.viewoneaboutus = async (req, res) => {
  const findone = await Aboutus.findOne({ _id: req.params.id });
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

exports.allaboutus = async (req, res) => {
  const findall = await Aboutus.find().sort({ sortorder: 1 });
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

exports.deleteaboutus = async (req, res) => {
  try {
    const deleteentry = await Aboutus.deleteOne({ _id: req.params.id });
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
