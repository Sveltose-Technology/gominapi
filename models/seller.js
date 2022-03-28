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
    rolename: {
      type: String,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
      //   // //active, inactive, owner, manager, employee
    },

    added_by: { type: Schema.Types.ObjectId, ref: "seller" },

    //  code: {
    //  type: String,
    //   default: 1234,
    // },
    otp: {
      type: Number,
    },
    hasSubscribed: {
      type: Boolean,
      default: false,
    },
    razorpay_payment_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller", sellerSchema);
