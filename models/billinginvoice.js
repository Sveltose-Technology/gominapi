const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billingInvoiceSchema = new Schema(
  {
    orderId: {
      type: String,
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    customer_name: { type: String, },
    customer_phone: { type: Number, },
    customer_email: { type: String, },
    total_qty: { type: String, },
    total_amount: { type: String, },
    product: [{
      type: Object
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("billinginvoice", billingInvoiceSchema);
