const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new mongoose.Schema(
  {
    offer_code: {
      type: String,
      // require: true,
      // unique: true,
    },
    product : {
      type: Schema.Types.ObjectId, ref :"product"
    },
    seller : {
      type : Schema.Types.ObjectId,ref :"seller"

    },
    description: {
      type: String,
    },
    startDate: {
      type: String,
    },
    expireOn: {
      type: String,
    },
    usage_limit: {
      type: Number,
    },
   
    amount : {
      type : Number
    },
    status: {
      type: String,
     default : "Active"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", CouponSchema);
