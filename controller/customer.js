const Customer = require("../models/customer");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt");
//const saltRounds = 10;

// const validatePassword = (password, dbpassword) => {
//   bcrypt.compareSync(password, dbpassword);
//   return true;
// };

function generateAccessToken(username) {
  return jwt.sign(customername, process.env.TOKEN_SECRET, {
    expiresIn: "1800h",
  });
}

exports.addcustomer = async (req, res) => {
  const {
    customerId,
    first_name,
    last_name,
    //password,
    customer_email,
    mobile_no,
    sortorder,
    status,
  } = req.body;

  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hashpassword = bcrypt.hashSync(password, salt);

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

  const newCustomer = new Customer({
    customerId: random_string,
    first_name: first_name,
    last_name : last_name,
   // password: hashpassword,
    customer_email: customer_email,
    mobile_no: mobile_no,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Customer.findOne({ mobile_no: mobile_no });
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

exports.login = async (req, res) => {
  const { customer_email, password } = req.body;

  // Find user with requested email
  Customer.findOne({ customer_email: customer_email }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      // console.log(process.env.TOKEN_SECRET);
      if (validatePassword(password, user.password)) {
        const token = jwt.sign({ customerId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "365d",
        });

        return res.status(201).send({
          message: "User Logged In",
          token: token,
          user: user,
        });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
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


exports.totalcustomer = async(req,res) =>{
  await Customer.countDocuments().then((data)=>{
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
  })
}