const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutusSchema = new Schema(
  {
    aboutus_title: {
      type: String,
    },
    display: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("about", aboutusSchema);
