const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminloginSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    mobile: {
      type: Number,
      //default : 9893245678
    },
    phoneno: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    image: {
      type: String,
    },

    email: {
      type: String,
      // default : "admin1232gmail.com"
    },
    password: {
      type: String,
      //default : "admin123"
    },
    cnfmPassword: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminlogin", AdminloginSchema);
