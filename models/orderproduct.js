const mongoose = require("mongoose");

const orderproductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    order_type: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    orderId: {
      type: String,
    },
    // customer_name: {
    //   type: String,
    // },
    qty: {
      type: Number,
    },
    purchaseprice: {
      type: Number,
      required: true,
    },

    delivery_address: {
      type: String,
    },

    // shippingdate: {
    //   type: String,
    // },
    // deliverdondate: {
    //   type: String,
    // },
    order_date: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderproduct", orderproductSchema);
