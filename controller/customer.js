const Customer = require("../models/customer");
const { v4: uuidv4 } = require("uuid");

exports.addcustomer = async (req, res) => {
  const {
    customerId,
    first_name,
    last_name,
    customer_email,
    mobile_no,
    sortorder,
    status,
  } = req.body;

  const newCustomer = new Customer({
    customerId: uuidv4(),
    first_name: first_name,
    last_name: last_name,
    customer_email: customer_email,
    mobile_no: mobile_no,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Customer.findOne({ customerId: customerId });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newCustomer
      .save()
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.editcustomer = async (req, res) => {
  const findandUpdateEntry = await Customer.findOneAndUpdate(
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

exports.allcustomer = async (req, res) => {
  const findall = await Customer.find().sort({ sortorder: 1 });
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

exports.getonecustomer = async (req, res) => {
  const findone = await Customer.findOne({ _id: req.params.id });
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

exports.delcustomer = async (req, res) => {
  try {
    const deleteentry = await Customer.deleteOne({ _id: req.params.id });
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
