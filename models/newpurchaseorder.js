const mongoose = require("mongoose");

const newpurchaseorderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true
    },

    product: [{
      type: Object
    }],
    stock_due: {
      type: Number,
    },
    gstIn: {
      type: String
    },
    payment_due: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
    },
    invoiceNo: {
      type: String
    },
    invoice_date: {
      type: String
    },
    status: {
      type: String
    },
    action: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("newpurchaseorder", newpurchaseorderSchema);
