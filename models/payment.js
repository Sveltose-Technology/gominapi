const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    razorpay_order_id: {
      type: String,
       
    },
    payment_id: {
        type: String,
         
      },
      razorpay_signature: {
        type: String,
         
      },
      seller :{
        type : Schema.Types.ObjectId, ref: "seller"
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payment", paymentSchema);
