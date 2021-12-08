const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    customerId: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type : String
    },
    password: {
      type: String,
    },
    customer_email: {
      type: String,
    },
    mobile_no: {
      type: Number,
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

module.exports = mongoose.model("customer", customerSchema);
