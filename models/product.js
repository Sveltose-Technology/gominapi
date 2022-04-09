const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    store :{
       type : Schema.Types.ObjectId, ref: "store"
    },
    // store: [{ type: Schema.Types.ObjectId, ref: "store" }],
    seller :{
      type : Schema.Types.ObjectId, ref: "seller"
   },
    product_name: {
      type: String,
      require: true,
    },
     
    sku_no: {
      type: String,
    },
    discount_perc: {
      type: Number,
    },
    hsn_sac_no: {
      type: String,
    },
    short_desc: {
      type: String,
    },
    long_desc: {
      type: String,
      //require: true,
    },
    brand: { type: Schema.Types.ObjectId, ref: "brand" },
    productcategory: { type: Schema.Types.ObjectId, ref: "productcategory" },
    productsubcategory: {
      type: Schema.Types.ObjectId,
      ref: "subproductcategory",
    },
    
    material: { type:  String },

    
    //user input

    sell_mode: {
      type: String,
      // Offline,Online,out of stock
    },
    qty: {
      type: Number,
    },
     
    reorder_level: {
      type: Number,
    },
     
    unit: { type: Schema.Types.ObjectId, ref: "unit" },
     color: [{ type: Schema.Types.ObjectId, ref: "color" }],
     size: [{ type: Schema.Types.ObjectId, ref: "size" }],

   // color : [{
  //   type :Object
  // }],
  // size : [{
  //   type :Object
  // }],

    cost_price: {
      type: Number,
    },
    sell_price: {
      type: Number,
    },
    gstrate: 
      { type: Schema.Types.ObjectId, ref: "gstrate" },
  
    product_img: {
      type: Array,
    }, //goods && service
    offer_aplicable : {
       type : String,
       default: "Inactive"
    },
    tag : {
      type : String
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
