const Contactform = require("../models/contact_form");

exports.addcontactform = async (req, res) => {
  const { name, email, mobile_no, state, city, address, message } = req.body;

  const newContactform = new Contactform({
    name: name,
    email: email,
    mobile_no: mobile_no,
    state: state,
    city: city,
    address: address,
    message: message,
  });

  newContactform.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error Occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "success",
        data: newContactform,
      });
    }
  });
};
exports.allcontactform = async (req, res) => {
  const findall = await Contactform.find().sort({ sortorder: 1 });
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

exports.delcontactform = async (req, res) => {
  try {
    const deleteentry = await Contactform.deleteOne({ _id: req.params.id });
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

exports.viewonecontactform = async (req, res) => {
  const findone = await Contactform.findOne({ _id: req.params.id });
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
