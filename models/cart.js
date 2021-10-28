const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    orderby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
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
