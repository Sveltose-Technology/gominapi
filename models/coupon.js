const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new mongoose.Schema(
  {
    offer_code: {
      type: String,
    },
    coupon_title: {
      type: String,
    },
    description: {
      type: String,
    },
    startDate: {
      type: String,
    },
    expireOn: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", CouponSchema);
