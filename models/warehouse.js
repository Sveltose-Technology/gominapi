const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    warehousename: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city :{
        type : String
    },
    pin : {
        type : Number
    },
    phone_no : {
        type : Number
    },
    email:{
        type : String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("warehouse", warehouseSchema);
