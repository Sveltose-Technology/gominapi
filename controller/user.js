const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
}

exports.adduser = async (req, res) => {
  const {
    //UserID,
    username,
    password,
    user_email,
    mobile_no,
    phone_no,
    login_as,
    register_at,
    sortorder,
    status,
  } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);
  const token = generateAccessToken({ username: username });
  const newUser = new User({
    //UserID: UserID,
    username: username,
    password: hashpassword,
    user_email: user_email,
    mobile_no: mobile_no,
    phone_no: phone_no,
    login_as: login_as,
    register_at: register_at,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await User.findOne({ mobile_no: mobile_no });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
    console.log(data);
  } else {
    newUser
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

exports.Adminlogin = async (req, res) => {
  const { mobile_no, password } = req.body;

  // Find user with requested email
  User.findOne({ mobile_no: mobile_no }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      console.log(process.env.TOKEN_SECRET);
      if (validatePassword(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
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
