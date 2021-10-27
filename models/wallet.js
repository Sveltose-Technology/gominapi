const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: "true",
    },
    first_name: {
      type: String,
    },

    last_name: {
      type: String,
    },
    walletId: {
      //type: mongoose.Schema.Types.ObjectId,
      //ref: "user",
      type: String,
      //required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wallet", walletSchema);
