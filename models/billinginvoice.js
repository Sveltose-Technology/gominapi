const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingInvoiceSchema = new Schema(
  {
    orderId: {
      type: String,
    },

customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
quantity: {
      type: Number,
      require: true,
    },
    total_amount: {
      type: Number,
    },
    action: {
      type: String,

    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("billinginvoice", billingInvoiceSchema);
