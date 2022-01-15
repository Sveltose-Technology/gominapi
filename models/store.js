const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    store: { type: Schema.Types.ObjectId, ref: "store" },
    seller: { type: Schema.Types.ObjectId, ref: "seller" },

    store_name: {
      type: String,
    },
    storeImg: {
      type: Array,
      require: true,
    },
    store_desc: {
      type: String,
      //require: true,
    },
    websiteUrl: {
      type: String,
      //require: true,
    },
    store_email: {
      type: String,
    },
    phone_no: {
      type: Number,
    },
    altphone_no: {
      type: Number,
    },
    altphone_no2: {
      type: Number,
    },
    day: {
      type: String,
    },
    openingTym: {
      type: String,
    },
    closingTym: {
      type: String,
    },
    address_line1: {
      type: String,
    },
    address_line2: {
      type: String,
    },
    landmark: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    gst_no: {
      type: String,
    },
    business_type: {
      type: String,
    },
    pan_no: {
      type: String,
    },
    company_panno: {
      type: String,
    },
    address_proof: {
      type: String,
    },
    shoplogo_img: {
      type: Array,
      //require: true,
    },
    gstImg: {
      type: Array,
      //require: true,
    },
    storepan_img: {
      type: Array,
    },
    tradelicence_img: {
      type: Array,
    },
    companypan_img: {
      type: Array,
    },
    address_proof_img: {
      type: Array,
    },
    sortorder: {
      type: Number,
    },
    // verifystore: {
    //   type: String,
    //   default: "NotVerified",
    // },
    status: {
      type: String,
      default: "Inactive",
    },
    trendingPoint :{
      type : Number,
      default:0
    },
    purchaseby :{type : Schema.Types.ObjectId,ref :"orderproduct"

    } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("store", storeSchema);
  