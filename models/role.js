const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    role_name: {
      type: String,
      require: true,
    },
    add_staff: {
      type: Boolean,
      default: false,
    },
    edit_staff: {
      type: Boolean,
      default: false,
    },
    view_staff: {
      type: Boolean,
      default: false,
    },
    delete_staff: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);
