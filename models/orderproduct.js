const mongoose = require("mongoose");

const orderproductSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
     },
     store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
     },
    order_type :{
      type : String
    },
    payment_type: {
      type: String,
    },
    product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    }],
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
      type :mongoose.Schema.Types.ObjectId,ref : "user_address"
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
    size : {
      type: String
    },
    color : {
      type : String
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderproduct", orderproductSchema);
