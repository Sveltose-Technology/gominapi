const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
     
    sizeName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("size", SizeSchema);
