const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    offer_code: {
      type: String,
      require: true,
      // unique: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    usage_limit: {
      type: Number,
    },
    discount: {
      type: String,
    },
    isPercent: {
      type: Number,
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
