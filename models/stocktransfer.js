const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocktransferSchema = new Schema(
  {
    // product: [{
    //     type: Object
    //   }],
    total_qty: { type: String },
    total_amount: { type: String },

    product: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        sku: { type: Number },
        hsn: { type: Number },
        gst: { type: Number },
        qty: { gst: Number },
        amount: { gst: String },
      },
    ],

    reference_no: {
      type: Number,
    },

    from_warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouse",
    },
    to_warehouse: {
      type: Schema.Types.ObjectId,
      ref: "warehouse",
    },
    transfer_date: {
      type: String,
    },
    delivery_duedate: {
      type: String,
    },
    transfer_type: {
      type: String,
    },
    reason: {
      type: Schema.Types.ObjectId,
      ref: "reason",
    },
    grandTotal: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stocktransfer", stocktransferSchema);
