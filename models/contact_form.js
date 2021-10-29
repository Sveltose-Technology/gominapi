const mongoose = require("mongoose");
const schema = mongoose.Schema;

const contactformSchema = new schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile_no: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact_form", contactformSchema);
