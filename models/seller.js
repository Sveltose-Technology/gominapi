const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    seller_name: {
      type: String,
    },
    Description: {
      type: String,
    },
    status: {
      type: String,
    },
    sortorder: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller", sellerSchema);
