const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    // customer: { type: String },
    cartId: {
      type: String
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    //  product: [
    //   {
    //     product :{ type: mongoose.Schema.Types.ObjectId,ref:"product"},size:{type : String},color:{type : String},price:{type :Number},qty:{type : Number}
    //   }
    // ],
    product_price: {
      type: Number,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    gstrate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gstrate",
    },
    product_qty: {
      type: Number,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    gsttotal:{
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
//console.log()