const mongoose = require("mongoose");

const sellerpurchaseorderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
     // required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
     // required: true,
    },
    qty: {
      type: Number,
    },
    purchaseprice: {
      type: Number,
      required: true,
    },
     
  },
  { timestamps: true }
);

module.exports = mongoose.model("sellerpurchaseorder", sellerpurchaseorderSchema);
