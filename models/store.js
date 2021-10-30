const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    storeID: {
      type: String,
      require: true,
    },
    store_logo: {
      type: String,
      require: true,
    },
    store_name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    owner_name: {
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

module.exports = mongoose.model("store", storeSchema);
