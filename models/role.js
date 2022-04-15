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
    addMyStore: {
      type: Boolean,
      default: false,
    },
    storeList:  {
      type: Boolean,
      default: false,
    },
    contacts:{
      type :Boolean,
      default: false,
    },
    addEmployee: {
      type: Boolean,
      default: false,
    },
    employeeList: {
      type: Boolean,
      default: false,
    },
    addCustomer:{
     type : Boolean,
       default: false,
    },
    customerList: {
      type: Boolean,
      default: false,
    },
    addSupplier: {
      type: Boolean,
      default: false,
    },
    supplierList:  {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Boolean,
      default: false,
    },
    AddMyProduct:  {
      type: Boolean,
      default: false,
    },
    productsList:  {
      type: Boolean,
      default: false,
    },
    stockControl:  {
      type: Boolean,
      default: false,
    },
    stockTransferRequest:  {
      type: Boolean,
      default: false,
    },
    stockAdjustment:  {
      type: Boolean,
      default: false,
    },
    coupons:  {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: Boolean,
      default: false,
    },
    choosePaymentOption: {
      type: Boolean,
      default: false,
    },
    subsList :{
      type: Boolean,
      default: false,
    },
    billing:  {
      type: Boolean,
      default: false,
    },
    order:  {
      type: Boolean,
      default: false,
    },
    purchase: {
      type: Boolean,
      default: false,
    },
    newPurchaseOrder: {
      type: Boolean,
      default: false,
    },
    purchaseOrderLis:{
      type: Boolean,
      default: false,
    },
    purchaseInvoiceList :{
      type: Boolean,
      default: false,
    },
    reports: {
      type: Boolean,
      default: false,
    },
rolesPermission: {
  type: Boolean,
      default: false,
},
roleList:{
  type: Boolean,
  default: false,
},
addRole: {
  type: Boolean,
  default: false,
},
setting: {
  type: Boolean,
  default: false,
},
brandList:{
  type: Boolean,
  default: false,
},
taxList: {
  type: Boolean,
  default: false,
},
unitList: {
  type: Boolean,
  default: false,
},
reasonList: {
  type: Boolean,
  default: false,
},
colourList: {
  type: Boolean,
  default: false,
},
sizeList: {
  type: Boolean,
  default: false,
},
productCategory: {
  type: Boolean,
  default: false,
},
material:{
  type: Boolean,
  default: false,
},
warehouseList: {
  type: Boolean,
  default: false,
}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);
