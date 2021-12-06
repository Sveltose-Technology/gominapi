const Adminlogin = require("../models/adminlogin");

exports.createadmin = async(req,res) =>{
   const {phone_no,password} = req.body
     
   const newAdminlogin = new Adminlogin({
    phone_no :phone_no,
    password :password
   })
   newAdminlogin.save(function(err,data){
       if(err){
           res.status(400).json({
               status :false,
               msg : "error occured",
               errro : err
           })
       }else{
        res.status(200).json({
            status: true,
            msg : "suucess",
            data: newAdminlogin,
          });
        }
       
   })

}
exports.adminlogin = async (req, res) => {
    const {email,phone_no,password } = req.body;
  
    // Find user with requested phone no.
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
  