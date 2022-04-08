const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    description: {
      type: String,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    sub_plan: {
      type: String,
    },
    duration: {
      type: String,
    },

    // status: {
    //   type: String,
    //   default: "Inactive",
    // },
    // sortorder: {
    //   type: String,
    // },
    // hasSubscribed: {
    //   type: Boolean,
    //   default: false,
    // },
    razorpay_payment_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscription", subscriptionSchema);
