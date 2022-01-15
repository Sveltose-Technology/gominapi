const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransfertypeSchema = new Schema(
  {
    
    transfer_type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transfer_type", TransfertypeSchema);
