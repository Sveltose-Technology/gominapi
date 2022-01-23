const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    password: {
      type: String,
    },
    cnfrm_password: {
      type: String,
    },
    image: {
      type: String,
    },
    designation: {
      type: String,
    },
    role: {
      type: String,
    },

    //  code: {
    //  type: String,
    //   default: 1234,
    // },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller", sellerSchema);
