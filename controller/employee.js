const Employee = require("../models/employee");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.addemployee = async (req, res) => {
  const {
    employeeId,
    employee_name,
    phone_no,
    email,
    password,
    designation,
    verification,
    owner,
    upload_picture,
    sortorder,
    status,
  } = req.body;

  const newEmployee = new Employee({
    employeeId: uuidv4(),
    employee_name: employee_name,
    phone_no: phone_no,
    email: email,
    password: password,
    designation: designation,
    verification: verification,
    owner: owner,
    upload_picture: upload_picture,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Employee.findOne({ employeeId: employeeId });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newEmployee.upload_picture = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newEmployee
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
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  }
};

exports.Getemployee = async (req, res) => {
  const findall = await Employee.find().sort({ sortorder: 1 });
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

exports.del_employee = async (req, res) => {
  try {
    const deleteentry = await Employee.deleteOne({ _id: req.params.id });
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
