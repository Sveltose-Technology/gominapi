const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    seller_name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirm_password: {
      type: String,
    },
    
    mobile: {
      type: Number,
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller", sellerSchema);
