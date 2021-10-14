const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productcategorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    product_img: {
      type: String,
      require: true,
    },

    desc: {
      type: String,
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

module.exports = mongoose.model("productcategory", productcategorySchema);
