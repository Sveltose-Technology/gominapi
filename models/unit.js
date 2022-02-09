const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitsSchema = new Schema(
  {

    seller :
      { type: Schema.Types.ObjectId, ref: "seller" },
    
    units_title: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    sortorder: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("unit", unitsSchema);
