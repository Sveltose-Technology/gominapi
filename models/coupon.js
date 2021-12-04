const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    offer_code: {
      type: String,
      // require: true,
      // unique: true,
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
    usage_limit: {
      type: Number,
    },
   
    amount : {
      type : Number
    },
    isActive: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", CouponSchema);
