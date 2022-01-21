const mongoose = require("mongoose");

const AddwishlistSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    color :{
 type : String
    },
    size : {
      type : String
    },
    qty : {
      type : Number
    },
    price : {
 type :Number
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addwishlist", AddwishlistSchema);
