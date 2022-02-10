const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    description: {
      type: String,
    },
    seller : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    sub_plan: {
      type: String,
    },
    duration: {
      type: String,
    },

    status: {
      type: String,
      default: "Inactive",
    },
    sortorder: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
