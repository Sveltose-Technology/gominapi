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
      type: mongoose.Schema.Types.ObjectId,ref :"order"
    },
    status : {
      type :String
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    cartId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    
    // qty: {
    //   type: Number,
    // },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // size: {
    //   type: String,
    // },
    // color: {
    //   type: String,
    // },
    status: {
      type: String,
      default :"Order order"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderproduct", orderProductSchema);
