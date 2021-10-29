const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    item_name: {
      type: String,
      require: true,
    },
    // productId: {
    //   type: Number,
    // },
    short_desc: {
      type: String,
    },
    desc: {
      type: String,
      require: true,
    },
    // code: {
    //   type: String,
    //   // require: true,
    // },
    hsn_code: {
      type: String,
      //require: true,
    },
    productcategory: { type: Schema.Types.ObjectId, ref: "productcategory" },
    productsubcategory: {
      type: Schema.Types.ObjectId,
      ref: "subproductcategory",
    },
    make: {
      type: String,
    },

    gst_rate: {
      type: String,
    },

    unit: { type: Schema.Types.ObjectId, ref: "unit" },
    alt_unit: { type: Schema.Types.ObjectId, ref: "altunit" },

    type_of_supply: {
      type: String,
    }, //goods && service

    material: {
      type: String,
    }, //user input
    stock_qty: {
      type: Number,
    },
    stock_clearance_limit: {
      type: Number,
    },

    rate: {
      type: Number,
    },
    size: {
      type: String,
    },
    colour: {
      type: String,
    },
    product_img: {
      type: Array,
    },
    // barcode: {
    //   type: Number,
    // },
    brand: { type: Schema.Types.ObjectId, ref: "brand" },
    inc_duty_tax: {
      type: Number,
    },

    sortorder: {
      type: Number,
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
