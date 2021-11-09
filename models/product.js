const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    // productId: {
    //   type: Number,
    // },
    sku_no: {
      type: String,
    },
    hsn_sac_no: {
      type: String,
    },
    short_desc: {
      type: String,
    },
    long_desc: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
    },
    productcategory: { type: Schema.Types.ObjectId, ref: "productcategory" },
    productsubcategory: {
      type: Schema.Types.ObjectId,
      ref: "subproductcategory",
    },
    colour: {
      type: String,
    },
    size: {
      type: String,
    },
    material: {
      type: String,
    }, //user input

    stock: {
      type: Boolean,
    },
    qty: {
      type: String,
    },
    reorder_level: {
      type: String,
    },

    unit: { type: Schema.Types.ObjectId, ref: "unit" },
    cost_price: {
      type: Number,
    },
    sell_price: {
      type: Number,
    },
    gst: {
      type: String,
    },
    images_upload: {
      type: String,
    }, //goods && service

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
