const Product = require("../models/product");
//const Image = require("../models/product");
const Productcategory = require("../models/productcategory");
const Brand = require("../models/brand");
const Store = require("../models/store");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addproduct = async (req, res) => {
  const {
    store,
    discount_perc,
    product_name,
    sku_no,
    hsn_sac_no,
    short_desc,
    long_desc,
    productcategory,
    productsubcategory,
    brand,
    tag,
    size,
    color,
    material,
    sell_mode,
    qty,
    //rating,
    reorder_level,
    unit,
    cost_price,
    sell_price,
    gstrate,
    product_img,
    offer_aplicable,
    
  } = req.body;

  const newProduct = new Product({
    store: store,
    seller: req.sellerId,
    product_name: product_name,
    discount_perc: discount_perc,
    sku_no: sku_no,
    hsn_sac_no: hsn_sac_no,
    short_desc: short_desc,
    long_desc: long_desc,
    productcategory: productcategory,
    productsubcategory: productsubcategory,
    brand: brand,
    tag: tag,
    size: size,
    color: color,
    material: material,
    sell_mode: sell_mode,
    qty: qty,
    //rating: rating,
    reorder_level: reorder_level,
    unit: unit,
    cost_price: cost_price,
    sell_price: sell_price,
    gstrate: gstrate,
    product_img: product_img,
    offer_aplicable: offer_aplicable,
    
  });

  if (req.files) {
    const findexist = await Product.findOne({
      product_name: product_name,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      // console.log(req.files);
      alluploads = [];
      for (let i = 0; i < req.files.length; i++) {
        const resp = await cloudinary.uploader.upload(req.files[i].path);
        fs.unlinkSync(req.files[i].path);

        alluploads.push(resp.secure_url);
      }
      //console.log(alluploads);

      if (alluploads.length !== 0) {
        newProduct.product_img = alluploads;
        newProduct.save().then((result) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: result,
          });
        });
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  } else {
    // console.log("changed node");
    const findexist = await Product.findOne({
      product_name: product_name,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newProduct
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    }
  }
};

exports.editproduct = async (req, res) => {
  const {
    discount_perc,
    product_name,
    sku_no,
    hsn_sac_no,
    short_desc,
    long_desc,
    productcategory,
    productsubcategory,
    brand,
    color,
    size,
    material,
    stock,
    qty,
    reorder_level,
    unit,
    cost_price,
    sell_price,
    gstrate,
    //product_img,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (discount_perc) {
    data.discount_perc = discount_perc;
  }
  if (product_name) {
    data.product_name = product_name;
  }
  if (sku_no) {
    data.sku_no = sku_no;
  }
  if (hsn_sac_no) {
    data.hsn_sac_no = hsn_sac_no;
  }
  if (short_desc) {
    data.short_desc = short_desc;
  }
  if (long_desc) {
    data.long_desc = long_desc;
  }
  if (productcategory) {
    data.productcategory = productcategory;
  }

  if (productsubcategory) {
    data.productsubcategory = productsubcategory;
  }
  if (brand) {
    data.brand = brand;
  }
  if (color) {
    data.color = color;
  }
  if (size) {
    data.size = size;
  }
  if (material) {
    data.material = material;
  }
  if (stock) {
    data.stock = stock;
  }
  if (qty) {
    data.qty = qty;
  }
  if (reorder_level) {
    data.reorder_level = reorder_level;
  }
  if (unit) {
    data.unit = unit;
  }
  if (cost_price) {
    data.cost_price = cost_price;
  }
  if (sell_price) {
    data.sell_price = sell_price;
  }
  if (gstrate) {
    data.gstrate = gstrate;
  }

  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.product_img = response.secure_url;
    fs.unlinkSync(req.file.path);
  }

  if (data) {
    const findandUpdateEntry = await Product.findOneAndUpdate(
      {
        $and: [{ seller: req.sellerId }, { _id: req.params.id }],
      },
      { $set: data },
     // { $set: { product_img: response.secure_url } },
      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.getproduct = async (req, res) => {
  const findall = await Product.find()
    .sort({ sortorder: 1 })
    .populate("gstrate")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("color")
    .populate("size")
    .populate("seller");
  //  .populate("material")

  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getoneproduct = async (req, res) => {
  const findone = await Product.findOne({ _id: req.params.id })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    //   .populate("gstrate")
    .populate("color")
    .populate("size");

  if (findone) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.del_product = async (req, res) => {
  try {
    const deleteentry = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.productbycategory = async (req, res) => {
  const findall = await Product.find({ productcategory: req.params.id })
    .sort({ sortorder: 1 })
    .populate("store")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("size")
    .populate("color")
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.productbybrand = async (req, res) => {
  const findall = await Product.find({ brand: req.params.id })
    .sort({ sortorder: 1 })
    .populate("store")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("size")
    .populate("color");

  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.productbysubcategory = async (req, res) => {
  const findall = await Product.find({ productsubcategory: req.params.id })
    .sort({ sortorder: 1 })
    .populate("store")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .sort({ sortorder: 1 })
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
}

exports.totalproduct = async (req, res) => {
  await Product.countDocuments()
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};



exports.totalproductbyseller = async (req, res) => {
  await Product.countDocuments({ seller: req.sellerId })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};



exports.searchItem = async (req, res) => {
  const { oneinput } = req.body;
  let allproducts = [];
  let errors = [];
  await Brand.find({ name: { $regex: oneinput, $options: "i" } })
    .then((data) => {
      // let allitems  = []
      // for (let i = 0; i < data.length; i++) {
      //   const element = data[i]._id;
      //   allitems.push(element);
      // }
      // for (let j = 0; j < allitems.length; j++) {
      //   allitems[key] = allitems[j];
      // }
      // console.log(allitems)
      // const obj = allitems.reduce((o, key) => ({ ...o, [key]: "whatever"}), {})
      // console.log(obj)

      //view all products of brands
      // if(data){
      //   for (let i = 0; i < data.length; i++) {
      //     const element = data[i]._id;
      //     await Product.find({brand:element}).then((product)=>{
      //       console.log(product)
      //     }).catch((error)=>{
      //       console.log(error)
      //     })
      //   }
      // }

      //store done
      //product and category done
      //brand

      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.searchinputproduct = async (req, res) => {
  const { oneinput } = req.body;
  await Product.find({ product_name: { $regex: oneinput, $options: "i" } })
    .then((data) => {
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    });
};

exports.searchinputbycategory = async (req, res) => {
  const { oneinput } = req.body;
  const findbycategory = await Productcategory.find({
    name: { $regex: oneinput, $options: "i" },
  });

  const findbybrand = await Brand.find({
    name: { $regex: oneinput, $options: "i" },
  });

  const findbyproduct = await Product.find({
    product_name: { $regex: oneinput, $options: "i" },
  });

  if (findbycategory && findbybrand) {
    let somearray = [];
    findbycategory.forEach((i) => {
      somearray.indexOf(i._id) === -1
        ? somearray.push(i._id)
        : console.log("already exists");
    });

    let somebrand = [];
    findbybrand.forEach((i) => {
      somebrand.indexOf(i._id) === -1
        ? somebrand.push(i._id)
        : console.log("already exists");
    });

    let findproducts = async () => {
      await Product.find({
        $or: [
          { brand: { $in: somebrand } },
          { productcategory: { $in: somearray } },
          { product_name: { $regex: oneinput, $options: "i" } },
        ],
      })
        .populate("productcategory")
        .populate("brand")
        .then((data1) => {
          res.status(200).json({
            status: true,
            data: data1,
          });
        });
    };
    findproducts();
  } else {
    res.status(400).json({
      status: false,
      data: findbyproduct,
    });
  }
};

exports.productbystore = async (req, res) => {
  const findall = await Product.find({ store: req.params.id })
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("color")
    .populate("size")
    // .populate("material")
    .populate("store");

  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.productbysellerbytoken = async (req, res) => {
  const findall = await Product.find({ seller: req.sellerId })
    .sort({ sortorder: 1 })
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("color")
    .populate("size")
    .populate("store")
    .populate("gstrate")
    .populate("seller");

  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.productsearchgetstore = async (req, res) => {
  const { oneinput } = req.body;
  const findall = await Product.find({
    product_name: { $regex: oneinput, $options: "i" },
  });

  if (findall) {
    let somearray = [];
    findall.forEach((i) => {
      somearray.indexOf(i.store) === -1
        ? somearray.push(i.store)
        : console.log("already exists");
      //console.log(i)
    });
    console.log(somearray);

    let getstore = async () => {
      await Store.find({ _id: { $in: somearray } }).then((data1) => {
        res.status(200).json({
          status: true,
          data: data1,
        });
      });
    };
    getstore();

    // res.status(200).json({
    //   status: true,
    //   msg: "success",
    //   data: findall,
    // });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getproductbytagname = async (req, res) => {
  const findall = await Product.find({ tag: req.params.id })
    .sort({ sortorder: 1 })
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        error: "error",
        error: error,
      });
    });
};

exports.getuniquetag = async (req, res) => {
  const findall = await Product.find()
    .distinct("tag")
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        error: "error",
        error: error,
      });
    });
};

exports.productbycolor = async (req, res) => {
  const findall = await Product.find({ color: req.params.id })
    .sort({ sortorder: 1 })
    .populate("store")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("size");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
//console.log()
exports.productbysize = async (req, res) => {
  const findall = await Product.find({ size: req.params.id })
    .sort({ sortorder: 1 })
    .populate("store")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("size");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.productbypricerange = async (req, res) => {
  const { minamt, maxamt } = req.body;

  const findall = await Product.find({
    sell_price: { $gte: minamt, $lte: maxamt },
  })
    .sort({ sortorder: 1 })
    .populate("store")
    .populate("productcategory")
    .populate("productsubcategory")
    .populate("unit")
    .populate("brand")
    .populate("size");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.dispense = async (req, res) => {
  const { qty } = req.body;
  try {
    //console.log(req.body);
    const getqty = await Product.findOne;
    //({ _id: req.params.id }, { $set: req.body }, { new: true });

    //console.log(getqty.stock_qty);
    const displayqty = Number(getqty.stock) - Number(qty);
    // console.log(displayqty);
    [{ $set: req.body }, { $set: req.body }, { new: true }];

    res.status(200).json({
      status: true,
      msg: "success",
      data: displayqty,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};



//console