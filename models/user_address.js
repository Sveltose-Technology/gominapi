const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const useraddressSchema = new Schema(
  {
    user_name: {
      type: String,
      //require: true,
    },
    phone_no: {
      type: String,
     // require: true,
    },
    address: {
      type: String,
     // require: true,
    },
    locality: {
      type: String,
      //require: true,
    },
    pincode: {
      type: Number,
     // require: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
     // require: true,
    },
   // near_bylocation: {
     // type: String,
      //require: true,
    //},
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_address", useraddressSchema);
