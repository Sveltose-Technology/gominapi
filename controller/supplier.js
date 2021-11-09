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
    sortorder,
    status,
  } = req.body;

  const newSupplier = new Supplier({
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
    sortorder: sortorder,
    status: status,
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
  const findall = await Supplier.find().sort({ sortorder: 1 });
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
