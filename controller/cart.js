const Cart = require("../models/cart");
const { verifytoken } = require("../functions/verifytoken");
const Store = require("../models/store");
const Seller = require("../models/seller");
const Product = require("../models/product");
const Gstrate = require("../models/gstrate");
const product = require("../models/product");


exports.addtocartproduct = async (req, res) => {


  const {cartId, product, product_price, product_qty, color, size } = req.body;

  let total_qty = 0;
   for (let i = 0; i < product.length; i++) {
     total_qty = total_qty + product[i].product_qty;
   }
   let sum = 0;
  let total_amount = 0;
  for (let i = 0; i < product.length; i++) {
   // total_amount =total_amount + product[i].product_price;
    //sum = sum + total_amount * total_qty;
  }
  //comment
  console.log();
   
   const getproduct = await Product.findOne({ _id: req.body.product });
  console.log(getproduct)
  if (getproduct) {
    const gstrate = await Gstrate.findOne({ _id: getproduct.gstrate });
    const value  =gstrate.value
    console.log(value)
    let gsttotal =0
    //gstttl = value + parseInt(product_price)
    gsttotal = (value*product_qty) +(product_price*product_qty)
    
  
  const addtoCart = new Cart({
    cartId : cartId,
    customer: req.userId,
   // gstrate: gstrate.value,
    product: product,
    product_price: product_price,
    product_qty: product_qty,
    color: color,
    size: size,
    gsttotal:gsttotal
  });

  const findexist = await Cart.findOne({
    $and: [
      {cartId : cartId},
      { customer: req.userId },
      { product: product },
      { color: color },
      { size: size },
      
    ],
  });
  if (findexist) {
    await Cart.findOneAndUpdate(
      {
        $and: [
          { customer: req.userId },
          { product: product },
          { color: color },
          { size: size },
        ],
      },
      { $set: {product_qty :findexist.product_qty + product_qty} },

      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "cart updated",
          data: data,
         //total: sum,
        //  gst_total:gsttotal
        
        });
      })
  
      .catch((error) => {
        res.status(200).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  
} else {
    addtoCart.save(function (err, data) {
      if (err) {
        res.status(400).json({
          status: false,
          msg: "Error Occured",
          error: err,
        });
      } else {
        res.status(200).json({
          status: true,
          msg: "Product added to cart",
          data: data,
          total_qty: product_qty,
           //total_amt : product_price,
           gst_total:gsttotal

        });
      }
    });
  }
}
}



exports.getallcart = async (req, res) => {


  
  const findall = await Cart.find({ customer: req.userId })

    .sort({ sortorder: 1 })
    .populate("customer")
    .populate("product")
    .populate({
      path: "product",
      populate: {
        path: "color",
      },
    })
    .populate({
      path: "product",
      populate: {
        path: "size",
      },
    }).populate({
      path: "product",
      populate: {
        path: "seller",
      },
    })
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "error",
      error: "error",
    });
  }
};

exports.editcart = async (req, res) => {
  const findandUpdateEntry = await Cart.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );

  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      status: "error",
      error: "error",
    });
  }
};

exports.removecart = async (req, res) => {
  try {
    const deleteentry = await Cart.deleteMany({ customer : req.userId,product:req.params.id });
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


exports.clearCart = async (req, res) => {
  try {
    const deleteentry = await Cart.deleteOne({ customer : req.userId});
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

 

exports.cartbycustomer = async (req, res) => {
  const findone = await Cart.find({customer: req.userId })
    // .populate("customer")

    .populate("product")
    // .populate({
    //   path: "product",
    //   populate: {
    //     path: "color",
    //   },
    // })
    // .populate({
    //   path: "product",
    //   populate: {
    //     path: "size",
    //   },
    // }).populate({
    //   path: "product",
    //   populate: {
    //     path: "seller",
    //   },
    //})
     .populate({
      path: "product",
      populate: {
        path: "gstrate",
      },
    })



   if (findone) {
   

  const findall = await Product.find({ product: req.params.id })
  console.log(findall)
  const value = findall.value
    console.log(findall)
    if (findall) {
      const getgst = await Gstrate.findOne({ gstrate: findall.gstrate });
     let value = getgst.value
     console.log(getgst)
console.log(value)

    let sum = 0;
    //const value = 0
     for (let i = 0; i < findone.length; i++) {
      let element_price = findone[i].product_price;
      let element_qty = findone[i].product_qty;
       
    //  let element_gst = findone[i].gsttotal;

       

       sum =(element_price * element_qty);
      // let sum = 0;
      // sum =  (element_price * element_qty);
      //  gsttotal = value +(element_price*element_qty)
      //   console.log(gsttotal)
      
        
      

     }
    res.status(200).json({
      status: true,
      msg: "success",

      data: findone,

      //  gsttotal: gsttotal, 
      //  ttl :gsttotal
       
       
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
}
 }


exports.cartbycartId = async (req, res) => {
  const findone = await Cart.find({cartId: req.params.id })
    .populate("customer")
    .populate("product")
    .populate({
      path: "product",
      populate: {
        path: "color",
      },
    })
    .populate({
      path: "product",
      populate: {
        path: "size",
      },
    }).populate({
      path: "product",
      populate: {
        path: "seller",
      },
    })
  if (findone) {
    let sum = 0;
     for (let i = 0; i < findone.length; i++) {
      let element_price = findone[i].product_price;
      let element_qty = findone[i].product_qty;
      sum = sum + element_price * element_qty;
    }
   // console.log(sum);
    //console.log(findone)
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
        total: sum,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};


exports.verifygst = async (req, res) => {
  
  const findone = await Cart.find({customer: req.userId })
if(findone){
  console.log(findone)
    const getproduct  = await Product.findOne({_id :req.body.product})
    if (getproduct){
      console.log(findone)
           const getgst = await Gstrate.findOne({_id :getproduct.gstrate })
           const value = getgst.value

    
           let total = 0
  
           for (let index = 0; index < findone.length; index++) {
             const element_Price = findone[index].product_price;
             let element_Qty = findone[index].product_qty;
             total =total + element_Qty * element_Price;
       gst = element_Price;
       //let gstrate =0;
       tol_price =total

       price = element_Price * element_Qty;
       tol_price =(getgstrate.value*element_Qty ) + price;
     }
         console.log(getproduct)
    console.log(tol_price)
    
    res.status(200).json({
      status: true,
      msg: "success",
      data: findone,
        // total: sum,
        Totalgst : tol_price
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
 
    }
  
  }
}

//CONSOLE