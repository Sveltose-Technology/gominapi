const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const altunitSchema = new Schema(
  {
    alt_unit_title: {
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
      active: "Active",
      deactive: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("altunit", altunitSchema);
