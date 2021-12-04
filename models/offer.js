const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new mongoose.Schema(
  {
    productId : {
      type: Schema.Types.ObjectId, ref :"product"
    },
    percentageOff : {
      type : String
    },
    sellerId : { type : Schema.Types.ObjectId

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

module.exports = mongoose.model("offer", offerSchema);
