const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // UserID: {
    //   type: String,
    //   require: true,
    // },
    username: {
      type: String,
    },
    user_email: {
      type: String,
    },
    userImage: {
      type: String,
    },
    mobile_no: {
      type: Number,
      require: true,
    },
    phone_no: {
      type: Number,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
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

module.exports = mongoose.model("user", userSchema);
