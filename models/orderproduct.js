const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema(
  {
    
    
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "product",
    //   required: true,
    // },
    // product: [
    //   {
    //     type: Object,
    //   },
    // ],
    orderId: {
      type: String,
    },
    
    qty: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderproduct", orderProductSchema);
