const Staff = require("../models/staff");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const bcrypt = require("bcrypt");
const validatePassword = (password, dbpassword) => {
  bcrypt.compareSync(password, dbpassword);
  return true;
};

function generateAccessToken(mobile_no) {
  return jwt.sign(mobile_no, process.env.TOKEN_SECRET, { expiresIn: "1800h" });
}
exports.addstaff = async (req, res) => {
  const {
    first_name,
    last_name,
    staff_email,
    password,
    mobile_no,
    role,
    sortorder,
    status,
  } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashpassword = bcrypt.hashSync(password, salt);
  const token = generateAccessToken({ mobile_no: mobile_no });

  const newStaff = new Staff({
    first_name: first_name,
    last_name: last_name,
    staff_email: staff_email,
    password: hashpassword,
    mobile_no: mobile_no,
    role: role,
    sortorder: sortorder,
    status: status,
  });

  const findexist = await Staff.findOne({ mobile_no: mobile_no });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newStaff
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

// exports.login = async (req, res) => {
//   const { mobile_no, password } = req.body;

//   // Find user with requested email
//   Staff.findOne({ mobile_no: mobile_no }, function (err, user) {
//     if (user === null) {
//       return res.status(400).send({
//         message: "User not found.",
//       });
//     } else {
//       console.log(process.env.TOKEN_SECRET);
//       if (validatePassword(password, user.password)) {
//         const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
//           expiresIn: "365d",
//         });

//         return res.status(201).send({
//           message: "User Logged In",
//           token: token,
//           user: user,
//         });
//       } else {
//         return res.status(400).send({
//           message: "Wrong Password",
//         });
//       }
//     }
//   });
// };

