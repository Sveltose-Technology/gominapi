const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellercontactformSchema = new Schema(
  {
    your_name: {
      type: String,
    },
    email_address: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("seller_contactform", sellercontactformSchema);
