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
      require: true,
    },
    product_img: {
      type: String,
      require: true,
    },
    productcategory: {
      type: Schema.Types.ObjectId,
      ref: "productcategory",
      require: true,
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
