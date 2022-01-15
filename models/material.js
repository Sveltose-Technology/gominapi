const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new mongoose.Schema(
  {
    materialname : {
      type: String
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("material", materialSchema);
