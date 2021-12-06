// const Adminlogin = require("../models/adminlogin");

// exports.login = async (req, res) => {
//       const { mobile_no, password } = req.body;
    
//       // Find user with requested email
//       Adminlogin.findOne({ mobile_no: mobile_no }, function (err, user) {
//         if (user === null) {
//           return res.status(400).send({
//             message: "User not found.",
//           });
//         } else {
//           console.log(process.env.TOKEN_SECRET);
//           if (validatePassword(password, user.password)) {
//             const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
//               expiresIn: "365d",
//             });
    
//             return res.status(201).send({
//               message: "User Logged In",
//               token: token,
//               user: user,
//             });
//           } else {
//             return res.status(400).send({
//               message: "Wrong Password",
//             });
//           }
//         }
//       });
//     };
    