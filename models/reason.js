const mongoose = require("mongoose");

const ReasonSchema = new mongoose.Schema(
  {
     
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reason", ReasonSchema);
