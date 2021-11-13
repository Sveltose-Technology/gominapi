const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
    },
    contact_no: {
      type: Number,
    },
    offer_code: {
      type: String,
      require: true,
      unique: true,
    },
    duration: {
      type: String,
      default: once,
    },
    expirationTime: {
      type: String,
      require: true,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    isPercent: {
      type: Boolean,
      require: true,
      default: true,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", CouponSchema);
