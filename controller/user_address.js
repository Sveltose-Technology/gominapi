const Useraddress = require("../models/user_address");

exports.adduser_address = async (req, res) => {
  const {
    user_name,
    phone_no,
    house_no,
    area,
    pincode,
    city,
    state,
    near_bylocation,
  } = req.body;

  const newUseraddress = new Useraddress({
    user_name: user_name,
    phone_no: phone_no,
    house_no: house_no,
    area: area,
    pincode: pincode,
    city: city,
    state: state,
    near_bylocation: near_bylocation,
  });

  newUseraddress.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "Error",
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

exports.edit_address = async (req, res) => {
  console.log = req.body;
  const findandUpdateEntry = await Useraddress.findOneAndUpdate(
    { _id: req.params.id },
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
