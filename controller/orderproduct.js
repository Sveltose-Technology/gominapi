const Ordertable = require("../models/orderproduct");
const { v4: uuidv4 } = require("uuid");
const Seller = require("../models/seller");
const Product = require("../models/product");
const Store = require("../models/store");
const Cart = require("../models/cart");
const { replaceOne } = require("../models/orderproduct");
const _ = require("lodash");

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();

  return `${date}-${month}-${year}`;
};

// exports.addOrder = async (req, res) => {
//   const {
//     product,
//     product_qty,
//     product_size,
//     product_color,
//     payment_type,
//     status,
//     orderId,
//     cus_orderId,
//     seller_orderId,
//     cartID,
//     //razorpay_payment_id,
//   } = req.body;

//   const cartitem = await Store.Cart({ _id: cartID });
//   const getstore = await Store.findOne({ product: req.params.id });
//   if (getstore && cartitem) {
//     const getproduct = await Product.findOne({ _id: req.body.product });
//     if (getproduct) {
//       const getstore = await Store.findOne({ _id: getproduct.store });
//       const newOrdertable = new Ordertable({
//         seller: getstore?.seller,
//         customer: req.userId,
//         //    razorpay_payment_id: cartitem.razorpay_payment_id,
//         product: cartitem.product,
//         product_qty: cartitem.product_qty,
//         product_size: cartitem.size,
//         product_color: cartitem.color,
//         payment_type: payment_type,
//         status: "Pending",
//         orderId: uuidv4(),
//         cus_orderId: "#ORDC" + Date.now(),
//         seller_orderId: "#ORDS" + Date.now(),
//       });
//       const findexist = await Ordertable.findOne({
//         $and: [
//           { customer: req.userId },
//           { seller: getstore?.seller },
//           { product: product },
//           { product_qty: product_qty },
//           { product_size: product_size },
//           { product_color: product_color },
//         ],
//       });
//       if (findexist) {
//         await Orderproduct.findOneAndUpdate({
//           $and: [
//             { customer: req.userId },
//             { seller: getstore?.seller },
//             { product: product },
//             { product_qty: product_qty },
//             { product_size: product_size },
//             { product_color: product_color },
//             { new: true },
//           ],
//         })
//           .then((data) => {
//             res.status(200).json({
//               status: true,
//               msg: "success",
//               data: data,
//             });
//           })
//           .catch((error) => {
//             res.status(200).json({
//               status: false,
//               msg: "error",
//               error: error,
//             });
//           });
//       } else {
//         newOrdertable.save(function (err, data) {
//           if (err) {
//             res.status(400).json({
//               status: false,
//               msg: "Error Occured",
//               error: err,
//             });
//           } else {
//             res.status(200).json({
//               status: true,
//               msg: "Product added to Order",
//               data: data,
//             });
//           }
//         });
//       }
//     }
//   }
// };

exports.addordersample = async (req, res) => {
  //let date = new Date().toJSON().slice(0, 10);

  // console.log(dtt)
  const cartitem = await Cart.find({ _id: req.body.cart });
  const finalarray = [];
  //let date = dtt;
  let total_qty = 0;
  let total_price = 0;
  const cus_orderId = "ORDC" + Date.now();
  //const seller_orderId = "ORDC" + Date.now();
  let sellersarray = [];
  let sellersorderidarray = [];
  for (let index = 0; index < cartitem.length; index++) {
    let element = {};
    element.product = cartitem[index]?.product;
    element.customer = cartitem[index].customer;
    element.product_price = cartitem[index].product_price;
    element.gsttotal = cartitem[index].gsttotal;
    element.product_qty = cartitem[index].product_qty;
    total_qty = total_qty + cartitem[index].product_qty;
    total_price = total_price + cartitem[index].gsttotal;
    element.color = cartitem[index].color;
    element.size = cartitem[index].size;
    element.payment_type = req.body.payment_type;
    element.status = req.body.status;
    element.date = req.body.date;
    element.cus_orderId = cus_orderId;
    const productdetail = await Product.findOne({
      _id: cartitem[index]?.product,
    });
    if (productdetail) {
      element.seller = productdetail?.seller;
      if (sellersarray.indexOf(productdetail?.seller) === -1) {
        const sellerNewId = "ORDC" + Date.now();
        element.seller_orderId = sellerNewId;
        sellersarray.push(productdetail?.seller);
        sellersorderidarray.push(sellerNewId);
      } else {
        element.seller_orderId = sellersorderidarray[0];
      }
   
    }
    let qqe=0
    if (cartitem[index].product_qty){
      // let pro= await Product.findOne({_id:req.body.id})
      // console.log("pro",pro)
       qqe=productdetail.qty
      console.log("product qut",qqe)
    }
      if(cartitem[index].product_qty>=0){
      element.product_qty = qqe-cartitem[index].product_qty;
      element.shipping_address = req.body.shipping_address;
      finalarray.push(element);
      console.log("finalarray",finalarray)
    
    
      await Ordertable.insertMany(finalarray)
        .then((data) => {
          res.json({
            status: true,
            msg: "Product added to Order",
            data: data,
            orderId: cus_orderId,
            total_qty: total_qty,
            total_price: total_price,
           
            
          });
        })
        .catch((error) => {
          res.json(error);
        });
        // console.log("aa",value)
        if (finalarray)
        {
       let aa= await Cart.deleteOne({ _id: req.body.cart });
       console.log("aa",aa)
        }
    
      //}
     }
     else{

      console.log("Out Of Stock")
    
      res.status(400).json({
        status: false,
        msg: "Out Of Stock ",
      });
     
    }
   
    // if (finalarray){
    //   let pro= await Product.countDocuments()
    //   console.log("product qut",pro)
      
    //   if(cartitem[index].product_qty<=0){
    //   element.product_qty = pro-cartitem[index].product_qty;
    //   }else{
    //     console.log("out of stok")
    //   }
   
    // }
  }


};

exports.orderbyseller = async (req, res) => {
  //const { orderId } = req.body;

  //const getseller = await Seller.findOne({ _id: req.sellerId });
  const findone = await Ordertable.find({ seller: req.sellerId })
    .populate("customer")
    .populate("seller")
    .populate("product")
    .populate("shipping_address");

  if (findone) {
    console.log(findone)
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

exports.orderlist = async (req, res) => {
  const findall = await Ordertable.find()
    .sort({ sortorder: -1 })
    .populate("seller")
    .populate("customer")
    .populate("product");
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
      // orderId: cus_orderId,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getorderbycustomer = async (req, res) => {
  const findall = await Ordertable.find({ customer: req.userId })
    .sort({ sortorder: 1 })
    .populate("customer")
    .populate("shipping_address")
    .populate("product");
  if (findall) {
    //   let total_price = 0;
    //    for (let i = 0; i < findall.length; i++) {
    //     let element_price = findall[i].product_price;
    //     let element_qty = findall[i].product_qty;
    //     total_price = total_price + element_price * element_qty;
    //   }
    const cartitem = await Cart.find({ _id: req.body.cart });
    let total_qty = 0;
    let total_price = 0;
    for (let index = 0; index < cartitem.length; index++) {
      let element = {};
      element.product = cartitem[index].product;

      element.product_price = cartitem[index].product_price;
      element.product_qty = cartitem[index].product_qty;
      total_qty = total_qty + cartitem[index].product_qty;
      total_price = total_price + cartitem[index].product_price;
    }
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
      total_price: total_price,
      total_qty: total_qty,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.getoneorderbyseller = async (req, res) => {
  //const getseller = await Seller.findOne({ _id: req.sellerId });

  const findone = await Ordertable.findOne ({$and: [{ seller: req.sellerId }, {  _id: req.params.id }]})
  
  //({ orderId: req.params.id })
    .populate("product")
    .populate("customer")
    .populate("shipping_address")
    .populate("seller")
    .populate({
      path: "product",
      populate: {
        path: "gstrate",
      },
    })
    .populate({
      path: "product",
      populate: {
        path: "store",
      },
    })
   
    
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


exports.pending_order = async (req, res, next) => {
  const finddetails = await Ordertable.find({
    $and: [{ seller: req.sellerId }, { status: "Pending" }],
  })
    .populate("customer")
    .populate("product")
    .then((result) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
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

// exports.updateOrderStatusbyseller = (req, res) => {

//    const findandUpdateEntry =  Ordertable.findOneAndUpdate(
//     { $and: [{ seller: req.sellerId }, { orderId: req.params.orderId }] },

//     { $set: { status: req.body.status } },
//     { new: true }
//   )

//     .then((findandUpdateEntry) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: findandUpdateEntry,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: error,
//       });
//     });
// };

// exports.getStatusValues = (req, res) => {
//   res.json(Order.schema.path('status').enumValues);
// };

exports.updateOrderStatusbyseller = async (req, res) => {
  const findandUpdateEntry = await Ordertable.findOneAndUpdate(
    {
      $or: [{ seller: req.sellerId }, { _id: req.params.id }],
    },
    { $set:{status :req.body.status} },
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
      msg: "error",
      error: "error",
    });
  }
};


exports.salesbyseller = async (req, res) => {
  const findall = await Ordertable.find({
    $and: [{ id: req.sellerId }, { status: "Complete" }],
  })
    .populate("customer")
    .populate("product")
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

exports.salesbyitem = async (req, res) => {
  const {product_name,status} = req.body

  const cartitem = await Product.find();
  console.log(cartitem)
  for (const iterator of cartitem) {
    pro=iterator._id
    if(pro==req.body.product_name){
      const findall = await Ordertable.countDocuments({
        $and: [{ id: req.sellerId },{product: req.body.product_name }, { status: "Complete" },{date:Date.now}],
      })
        .populate("customer")
        .populate("product")
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
    }
  }
  var newarr = cartitem.map(function (value) {
    return value.product_name;
  });
if(newarr){}
  
};

exports.totalorder = async (req, res) => {
  await Ordertable.countDocuments()
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

exports.totalorderbySeller = async (req, res) => {
  await Ordertable.countDocuments({ seller: req.sellerId })
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

exports.deleteOrder = async (req, res) => {
    try {
      const deleteentry = await Ordertable.deleteOne({ _id: req.params.id });
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
  

  exports.sellerinvoice_icm = async(req,res) =>{
     
 
     const findall = await Ordertable.find({
      $and: [{ seller: req.sellerId }, { date: getCurrentDate() },{status: "Complete"}],
    }).populate("customer")
    .populate("product")
    
    var newarr = findall.map(function (value) {
      return value.gsttotal;
    })

    console.log('GSTTOTSL',newarr)
    let total = _.sum([...newarr])
    console.log("total",total)

      if(findall){
        res.status(200).json({
          status:true,
          msg : "success",
          data : findall,
          Totalincome : total
        })
       } else {
          res.status(400).json({
            status: false,
            msg: "error",
            error: "error",
          });
        }
    
  };
  
  
   

 