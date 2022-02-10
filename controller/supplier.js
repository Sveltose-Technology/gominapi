const Supplier = require("../models/supplier");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

exports.addsupplier = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_no,
    company,
    address_one,
    address_two,
    state,
    city,
    postcode,
    gst_no,
     
     
  } = req.body;

  const newSupplier = new Supplier({
    seller :req.sellerId,
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_no: phone_no,
    company: company,
    address_one: address_one,
    address_two: address_two,
    state: state,
    city: city,
    postcode: postcode,
    gst_no: gst_no,
    
  });

  const findexist = await Supplier.findOne({ phone_no: phone_no });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newSupplier
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
exports.Getsupplier = async (req, res) => {
  const findall = await Supplier.find({seller :req.sellerId}).populate("seller").sort({ sortorder: 1 });
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

exports.getonesupplier = async (req, res) => {
  const findone = await Supplier.findOne({ $and :[{seller : req.sellerId},{_id: req.params.id }]}).populate("seller")
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

exports.edit_supplier = async (req, res) => {
  const findandUpdateEntry = await Supplier.findOneAndUpdate(
    {
      $and: [{ id: req.sellerId }, { _id: req.params.id }],
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

exports.del_supplier = async (req, res) => {
  try {
    const deleteentry = await Supplier.deleteOne({ _id: req.params.id });
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


exports.totalsupplierBytoken = async (req, res) => {
  await Supplier.countDocuments({seller :req.sellerId})
    .then((data) => {
      res.status(200).json({
        status: true,
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
};