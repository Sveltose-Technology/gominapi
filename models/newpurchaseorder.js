const mongoose = require("mongoose");

const newpurchaseorderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    supplier : {
 type :  mongoose.Schema.Types.ObjectId,
 ref : "supplier",
 required : true
    },
  
    product: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
     // required: true,
    }],
    stock_due: {
      type: Number,
    },
    gstIn : {
      type : String
    },
    payment_due: {
      type: Number,
      required: true,
    },
    orderId: {
        type: String,
      },
     
  },
  { timestamps: true }
);

module.exports = mongoose.model("newpurchaseorder", newpurchaseorderSchema);
