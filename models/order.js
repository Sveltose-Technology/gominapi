const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_type: {
      type: String,
    },
    payment_type: {
      type: String,
    },
   
    orderId: {
      type: String,
    },
     
    qty: {
      type: Number,
    },
    

    delivery_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_address",
    },
    shipping_date: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
