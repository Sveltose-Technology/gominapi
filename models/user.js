const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    UserID: {
      type: String,
      require: true,
    },
    username: {
      type: String,
    },
    user_email: {
      type: String,
    },
    mobile_no: {
      type: Number,
      require: true,
    },
    phone_no: {
      type: Number,
    },
    password: {
      type: String,
    },
    login_as: {
      type: String,
    },
    register_at: {
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
