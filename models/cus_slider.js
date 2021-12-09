const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSliderSchema = new Schema(
  {
    sliderTitle: {
      type: String,
    },
    sliderImg: {
      type: Array,
    },
    bannertype: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cus_slider", CustomerSliderSchema);
