const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new mongoose.Schema(
  {
    product : {
      type: Schema.Types.ObjectId, ref :"product"
    },
    offerTitle : {
      type :String
    },
    percentageOff : {
      type : String
    },
    seller : { type : Schema.Types.ObjectId,ref :"seller"

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
