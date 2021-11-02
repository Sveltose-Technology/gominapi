const mongoose = require("mongoose");

const AddwishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    product_price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addwishlist", AddwishlistSchema);
