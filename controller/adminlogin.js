const Adminlogin = require("../models/adminlogin");

exports.adminlogin = async (req, res) => {
    const {email,phone_no,password } = req.body;
  
    // Find user with requested email
    Seller.findOne(
      {
        $or: [
        {phone_no : phone_no},
          { email: email },
          { password: password },
        ],
      },
      function (err, user) {
        if (user === null) {
          return res.status(400).send({
            message: "User not found.",
          });
        } else {
          if (validatePassword(password, user.password)) {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "365d",
            });
  
            return res.status(201).send({
              message: "User Logged In",
              token: token,
              user: user,
              usertype : "Admin"
            });
          } else {
            return res.status(400).send({
              message: "Wrong Password",
            });
          }
        }
      }
    );
  };
  