const mongoose = require("mongoose");

const newpurchaseorderSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true
    },
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "product",
      
    // },

    product: [{
      type: Object
    }],
    stock_due: {
      type: Number,
    },
    gstIn: {
      type: String
    },
    payment_due: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
    },
    invoiceNo: {
      type: String
    },
    invoice_date: {
      type: String
    },
    transportation_cost: {
      type: Number
    },
    grand_total :{
 type : Number
    },
    instructions : {
      type : String
    },
    amount: {
      type: Number
    },
    status:{
      type : String,
      default:"Pending"
      //Approve,Decline
    },
    upload_Invoice : {
      type :String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("newpurchaseorder", newpurchaseorderSchema);
