const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema(
  {
    discountId: {
      type: Number,
      unique: true,
    },
    discount: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("discount", DiscountSchema);
