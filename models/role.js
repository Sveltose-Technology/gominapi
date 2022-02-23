const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    addemp: 
      { type: Schema.Types.ObjectId, ref: "seller" },
  
emp :
  { type: Schema.Types.ObjectId, ref: "seller" },

  dashboard: {
    type: Boolean,
    default: false,
  },
  store: {
    type: Boolean,
    default: false,
  },
    // employee: {
    //   type: Boolean,
    //   default: false,
    // },
    // customer: {
    //   type: Boolean,
    //   default: false,
    // },
    contacts:{
      type :Boolean,
      default: false,
    },
    // supplier: {
    //   type: Boolean,
    //   default: false,
    // },

    // product: {
    //   type: Boolean,
    //   default: false,
    // },
    inventory:{
     type : Boolean,
       default: false,
    },
    stockControl: {
      type: Boolean,
      default: false,
    },
    // offers: {
    //   type: Boolean,
    //   default: false,
    // },
    coupons: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: Boolean,
      default: false,
    },
    billing: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Boolean,
      default: false,
    },
    purchase: {
      type: Boolean,
      default: false,
    },
    reports: {
      type: Boolean,
      default: false,
    },
    // notification: {
    //   type: Boolean,
    //   default: false,
    // },
    rolesPermission: {
      type: Boolean,
      default: false,
    },
    setting: {
      type: Boolean,
      default: false,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);
