const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
  {
     
    colorName: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("color", ColorSchema);
