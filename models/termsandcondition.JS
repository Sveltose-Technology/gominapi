const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const termsandconditionSchema = new Schema(
  {
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("termsandcondition", termsandconditionSchema);
