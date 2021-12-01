const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tredingstoreSchema = new mongoose.Schema(
  {
    store_title: {
      type: String,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    storeImg :{
      type : String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("tredingstore", tredingstoreSchema);
