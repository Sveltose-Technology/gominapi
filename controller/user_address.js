const Useraddress = require("../models/user_address");

exports.addcus_address = async (req, res) => {
  const { address, locality, pincode, city, state } = req.body;

  const newUseraddress = new Useraddress({
    customer: req.userId,
    address: address,
    locality: locality,
    pincode: pincode,
    city: city,
    state: state,
  });

  newUseraddress.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "error",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Added new address",
        data: newUseraddress,
      });
    }
  });
};

exports.getaddress = async (req, res) => {
  const findall = await Useraddress.find({ customer: req.userId })
    .sort({ sortorder: 1 })
    .populate("customer");
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

exports.viewoneuseraddress = async (req, res) => {
  const findone = await Useraddress.findOne({ customer: req.userId }).populate("customer")
  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "Add New Address",
      error: "error",
    });
  }
};

exports.edit_address = async (req, res) => {
  //console.log = req.body;
  const findandUpdateEntry = await Useraddress.findOneAndUpdate(
    { customer: req.userId },
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
