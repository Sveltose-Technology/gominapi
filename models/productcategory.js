const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productcategorySchema = new Schema(
  {
    name: {
      type: String,
    },

    product_img: {
      type: String,
    },

    desc: {
      type: String,
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
