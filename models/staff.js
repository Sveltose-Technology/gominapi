const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var AutoIncrement = require("mongoose-sequence")(mongoose);

const staffSchema = new Schema(
  {
    Prefix: {
      type: String,
      default: "STAFF",
    },
    staffID: {
      type: Number,
    },
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    staff_email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
    mobile_no: {
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
    // role: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   require: true,
    //   ref: "role",
    // },
    //roles
    //EM Employee
    //AA Account Manager
    //
     
  },
  { timestamps: true }
);
staffSchema.plugin(AutoIncrement, { inc_field: "staffID" });

module.exports = mongoose.model("staff", staffSchema);
