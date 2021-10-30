const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    seller_name: {
      type: String,
    },
    sellerId: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile_no: {
      type: Number,
    },
    store_img: {
      type: String,
    },
    business_name: {
      type: String,
    },
    business_type: {
      type: String,
    },
    store_name: {
      type: String,
    },
    store_address: {
      type: String,
    },
    gstin_no: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller", sellerSchema);
