const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    description: {
      type: String,
    },
    sub_plan: {
      type: String,
    },
    duration: {
      type: String,
    },

    status: {
      type: String,
      default: false,
    },
    sortorder: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
