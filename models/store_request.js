const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storerequestSchema = new Schema(
  {
    store_details: {
      type: String,
    },
    uploaded_document: {
      type: String,
    },
    store_request: {
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

module.exports = mongoose.model("store_request", storerequestSchema);
