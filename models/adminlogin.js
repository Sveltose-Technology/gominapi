const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminloginSchema = new mongoose.Schema(
  {
    mobile : {
      type: Number,
      //default : 9893245678
    },
    email : {
      type :String,
     // default : "admin1232gmail.com"
    },
    password : {
      type : String,
      //default : "admin123"
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminlogin", AdminloginSchema);
