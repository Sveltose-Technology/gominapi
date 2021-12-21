const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trendingstoreSchema = new mongoose.Schema(
  {
    trending_title: {
      type: String,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    store_img :{
      type : String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("trendingstore", trendingstoreSchema);
