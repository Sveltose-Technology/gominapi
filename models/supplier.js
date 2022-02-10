const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {

     seller : {
      type : mongoose.Schema.Types.ObjectId,
     ref : "seller"
     },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      
    },
    phone_no: {
      type: Number,
    },
    company: {
      type: String,
      require: true,
    },
    address_one: {
      type: String,
    },
    address_two: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    postcode: {
      type: Number,
    },
    gst_no: {
      type: String,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("supplier", supplierSchema);
