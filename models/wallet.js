const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    wallet_balance: {
      type: Number,
    },
    walletId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wallet", walletSchema);
