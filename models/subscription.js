const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  storeName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  email: {
    type: String,
  },

  storeID: {
    type: String,
  },
  sub_date: {
    type: String,
  },
  renewal_date: {
    type: String,
  },
  salecategory_status: {
    type: String,
  },
  planname: {
    type: String,
  },
  sub_price: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: String,
  },
});
