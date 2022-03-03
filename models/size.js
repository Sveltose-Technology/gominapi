const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
     
    sizeName: {
      type: String,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
     },
  },
  { timestamps: true }
);

module.exports = mongoose.model("size", SizeSchema);
