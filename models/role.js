const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    role_name: {
      type: String,
      require: true,
    },
    store_add: {
      type: Boolean,
      default: false,
    },
    store_edit: {
      type: Boolean,
      default: false,
    },
    store_view: {
      type: Boolean,
      default: false,
    },
    store_delete: {
      type: Boolean,
      default: false,
    },

    customer_add: {
      type: Boolean,
      default: false,
    },
    customer_edit: {
      type: Boolean,
      default: false,
    },
    customer_view: {
      type: Boolean,
      default: false,
    },
    customer_delete: {
      type: Boolean,
      default: false,
    },
    employee_add: {
      type: Boolean,
      default: false,
    },
    employee_edit: {
      type: Boolean,
      default: false,
    },
    employee_view: {
      type: Boolean,
      default: false,
    },
    employee_delete: {
      type: Boolean,
      default: false,
    },
    supplier_add: {
      type: Boolean,
      default: false,
    },
    supplier_edit: {
      type: Boolean,
      default: false,
    },
    supplier_view: {
      type: Boolean,
      default: false,
    },
    supplier_delete: {
      type: Boolean,
      default: false,
    },
    product_add: {
      type: Boolean,
      default: false,
    },
    product_edit: {
      type: Boolean,
      default: false,
    },
    product_view: {
      type: Boolean,
      default: false,
    },
    product_delete: {
      type: Boolean,
      default: false,
    },
    stockcontrol_add: {
      type: Boolean,
      default: false,
    },
    stockcontrol_edit: {
      type: Boolean,
      default: false,
    },
    stockcontrol_view: {
      type: Boolean,
      default: false,
    },
    stockcontrol_delete: {
      type: Boolean,
      default: false,
    },
    offer_add: {
      type: Boolean,
      default: false,
    },
    offer_edit: {
      type: Boolean,
      default: false,
    },
    offer_view: {
      type: Boolean,
      default: false,
    },
    offer_delete: {
      type: Boolean,
      default: false,
    },
    coupon_add: {
      type: Boolean,
      default: false,
    },
    coupon_edit: {
      type: Boolean,
      default: false,
    },
    coupon_view: {
      type: Boolean,
      default: false,
    },
    coupon_delete: {
      type: Boolean,
      default: false,
    },
    billing_add: {
      type: Boolean,
      default: false,
    },
    billing_edit: {
      type: Boolean,
      default: false,
    },
    billing_view: {
      type: Boolean,
      default: false,
    },
    billing_delete: {
      type: Boolean,
      default: false,
    },
    purchaseorder_add: {
      type: Boolean,
      default: false,
    },
    purchaseorder_edit: {
      type: Boolean,
      default: false,
    },
    purchaseorder_view: {
      type: Boolean,
      default: false,
    },
    purchaseorder_delete: {
      type: Boolean,
      default: false,
    },
    purchaseInvoice_add: {
      type: Boolean,
      default: false,
    },
    purchaseInvoice_edit: {
      type: Boolean,
      default: false,
    },
    purchaseInvoice_view: {
      type: Boolean,
      default: false,
    },
    purchaseInovice_delete: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);
