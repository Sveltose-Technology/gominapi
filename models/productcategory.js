const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productcategorySchema = new Schema(
  {
    name: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    product_img: {
      type: String,
    },
    price: {
      type : String
    },
    desc: {
      type: String,
    },
    trendingcatpoint : {
  type : Number,
  default : 0
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("productcategory", productcategorySchema);
