const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    // role_name: {
    //   type: String,
    //   require: true,
    // },

    seller :{
      type : Schema.Types.ObjectId, ref: "seller"
   },
   store: {
      type: Boolean,
      default: false,
     },
     employee: {
      type: Boolean,
      default: false,
     },
     customer: {
      type: Boolean,
      default: false,
     },
     supplier: {
      type: Boolean,
      default: false,
     },
     product: {
      type: Boolean,
      default: false,
     },
     stockControl: {
      type: Boolean,
      default: false,
     },
     offers: {
      type: Boolean,
      default: false,
     },
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
     purcahse: {
      type: Boolean,
      default: false,
     },
     reports: {
      type: Boolean,
      default: false,
     },
     notification: {
      type: Boolean,
      default: false,
     },
     rolesPermission: {
      type: Boolean,
      default: false,
     },
     setting: {
      type: Boolean,
      default: false,
     },
    // store_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // store_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // store_delete: {
    //   type: Boolean,
    //   default: false,
    // },

    // customerPermission : {
    //  type :Boolean,
    //  default: false,
    // },

    // customer_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // customer_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // customer_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // customer_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // empPermission : {
    //   type : Boolean,
    //   default: false,
    // },
    // employee_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // employee_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // employee_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // employee_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // supplierPermission :{
    //   type :Boolean,
    //   default: false,
    // },
    // supplier_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // supplier_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // supplier_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // supplier_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // productPermission : {
    //   type : Boolean,
    //   default: false,
    // },
    // product_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // product_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // product_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // product_delete: {
    //   type: Boolean,
    //   default: false,
    // },

    // stockcntrlPermission :{
    //   type: Boolean,
    //   default: false,
    // },
    // stockcontrol_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // stockcontrol_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // stockcontrol_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // stockcontrol_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // offerPermission : {
    //   type: Boolean,
    //   default: false,
    // },
    // offer_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // offer_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // offer_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // offer_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // couponPermission :{
    //   type: Boolean,
    //   default: false,
    // },
    // coupon_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // coupon_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // coupon_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // coupon_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // billingPermission :{
    //   type: Boolean,
    //   default: false,
    // },
    // billing_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // billing_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // billing_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // billing_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseorderPer : {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseorder_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseorder_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseorder_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseorder_delete: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseInvoicePer : {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseInvoice_add: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseInvoice_edit: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseInvoice_view: {
    //   type: Boolean,
    //   default: false,
    // },
    // purchaseInovice_delete: {
    //   type: Boolean,
    //   default: false,
    // },

  },
  { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);
