const Employee = require("../models/employee");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");
//const { v4: uuidv4 } = require("uuid");

exports.addemployee = async (req, res) => {
  const {
    employeeId,
    employee_name,
    phone_no,
    email,
    password,
    designation,
    role,
    image,
    sortorder,
    status,
  } = req.body;

  //console.log
  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }

  const newEmployee = new Employee({
    employeeId: random_string,
    employee_name: employee_name,
    phone_no: phone_no,
    email: email,
    password: password,
    designation: designation,
    role: role,
    image: image,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Employee.findOne({ phone_no: phone_no });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newEmployee.image = resp.secure_url;
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
  const findall = await Employee.find().sort({ sortorder: 1 }).populate("role");
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

exports.getoneemployee = async (req, res) => {
  const findone = await Employee.findOne({ _id: req.params.id });
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
exports.edit_employee = async (req, res) => {
  const {
    employee_name,
    phone_no,
    email,
    password,
    designation,
    role,
    image,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (employee_name) {
    data.employee_name = employee_name;
  }
  if (phone_no) {
    data.phone_no = phone_no;
  }
  if (email) {
    data.email = email;
  }
  if (password) {
    data.password = password;
  }
  if (designation) {
    data.designation = designation;
  }
  if (role) {
    data.role = role;
  }
  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  //console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.image = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  console.log(data);
  if (data) {
    const findandUpdateEntry = await Employee.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: data },
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
  }
};

exports.del_employee = async (req, res) => {
  try {
    const deleteentry = await Employee.deleteOne({
      _id: req.params.id,
    }).populate("role");
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
