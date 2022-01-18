const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile:{
      type :Number
    },
    password: {
      type: String,
      default:12345
    },
      
    address :{
      type : String
    },
    locality : {
      type : String
    },
    pincode:{
      type : String
    },
    state : {
      type : String
    },
    city:{
      type : String
    },
    //  code: {
    //  type: String,
    //   default: 1234,
    // },
    
    otp : {
      type : Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
