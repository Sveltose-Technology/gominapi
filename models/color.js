const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
  {
     
    colorName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("color", ColorSchema);
