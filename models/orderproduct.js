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
    //     product :{ type: mongoose.Schema.Types.ObjectId,ref:"product"},size:{type : String},color:{type : String},price:{type :Number},qty:{type : Number}
    //   }
    // ],
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    status: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    // cartId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    cartId : {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},

    
    status: {
      type: String,
      default: "Order Placed",
      // Delivered, Cancelled,Pending,Compeleted
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderproduct", orderProductSchema);
