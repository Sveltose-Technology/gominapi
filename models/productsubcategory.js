const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subproductcategorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },
    product_img: {
      type: String,
    },
    productcategory: {
      type: Schema.Types.ObjectId,
      ref: "productcategory",
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

module.exports = mongoose.model("subproductcategory", subproductcategorySchema);
