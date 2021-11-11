const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    employeeId: {
      type: String,
    },
    employee_name: {
      type: String,
    },
    phone_no: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    designation: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "role",
    },

    // owner: {
    //   type: String,
    // }, //manager , employee
    image: {
      type: String,
    },
    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      active: "Active",
      deactive: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employee", employeeSchema);
