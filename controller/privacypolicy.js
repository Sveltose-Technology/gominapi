const privacypolicy = require("../models/privacypolicy");

exports.addprivacypolicy = async (req, res) => {
  const { description } = req.body;

  const newprivacypolicy = new privacypolicy({
    description: description,
  });

  newprivacypolicy.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Privacy policy added",
        data: newprivacypolicy,
      });
    }
  });
};

exports.delprivacypolicy = async (req, res) => {
  try {
    const deleteentry = await privacypolicy.deleteOne({ _id: req.params.id });
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

exports.allprivacy_policy = async (req, res) => {
  const findall = await privacypolicy
    .find()
    .sort({ sortorder: 1 })
    .then((result) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    });
};
