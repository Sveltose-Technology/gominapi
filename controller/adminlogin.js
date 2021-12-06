const Adminlogin = require("../models/adminlogin");




exports.adminlogin = async (req, res) => {
    const {email,phone_no,password } = req.body;
  
    // Find user with requested email
    Adminlogin.findOne(
      {phone_no : phone_no},
      function (err, user) {
        if (user === null) {
          return res.status(400).send({
            message: "User not found.",
          });
        } else if(true) {
            res.status(201).send({
              message: "User Logged In",
              user: user,
              usertype : "Admin"
            });
          } else {
            return res.status(400).send({
              message: "Wrong Password",
            });
          }
        }
    );
  };
  