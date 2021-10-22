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
    varified_store: {
      type: String,
    },
    store_owner: {
      type: String,
      require: true,
    },
    store_request: {
      type: Boolean, //yes,no
    },
    request_for: {
      type: String,
    }, // Received/not Received
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
