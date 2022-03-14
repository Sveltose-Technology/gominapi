const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new mongoose.Schema(
  {
    offer_code: {
      type: String,
    },
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
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
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", CouponSchema);
