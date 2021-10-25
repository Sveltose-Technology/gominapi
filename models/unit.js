const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitsSchema = new Schema({
  units_title: {
    type: {
      type: String,
    },
    value: {
      type: Number,
    },
    desc: {
      type: String,
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
});
