const mongoose = require("mongoose");

const AddwishlistSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addwishlist", AddwishlistSchema);
