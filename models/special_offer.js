const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialofferSchema = new mongoose.Schema(
  {
    specialoffer_title: {
      type: String,
      require: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: true,
    },
    product_qty: {
      type: Number,
    },
    offer_img: {
      type: String,
    },
    description: {
      type: String,
    },
    rate: {
      type: String,
    },
    status: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("special_offer", specialofferSchema);
