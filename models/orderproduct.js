const mongoose = require("mongoose");

const OrdertableSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    product_qty: {
      type: Number,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    payment_type: {
      type: String,
    },
    product_price: {
      type: Number,
    },
    status: {
      type: String,
      default: "Order Placed",
      // enum: ["Pending", "complete", "Cancel", "Delivery"]
    },
    orderId: {
      type: String,
    },
    cus_orderId: {
      type: String,
    },
    seller_orderId: {
      type: String,
    },
    // razorpay_payment_id: {
    //   type: String,
    // },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_address",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderproduct", OrdertableSchema);
