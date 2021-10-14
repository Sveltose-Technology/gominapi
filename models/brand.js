const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    brand_img: {
      type: String,
      require: true,
    },
    // promoted_brand: {
    //   type: Boolean,
    //   //true,false
    // },
    desc: {
      type: String,
      require: true,
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("brand", brandSchema);
