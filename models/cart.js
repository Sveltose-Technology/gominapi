const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    product_price: {
      type: Number,
    },
    product_qty: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
