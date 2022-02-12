const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
    // provider: {
    //   type: String,
    //   require: true,
    // },
    // apikey: {
    //   type: String,
    //   require: true,
    // },
    // templatename: {
    //   type: String,
    //   require: true,
    // },

    template_id:{
type : String
    },

    mobile:{
      type : String
          },
          authkey:{
            type : String
                },

    status: {
      type: String,
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("dynotp", otpSchema);
