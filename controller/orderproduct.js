 const Orderproduct = require("../models/orderproduct");
 const Store = require("../models/store");
// const { v4: uuidv4 } = require("uuid");
 const Seller = require("../models/seller");
 const Product = require("../models/product");
const cart = require("../models/cart");
const store = require("../models/store");


// exports.addoderproduct = async (req, res) => {
//   // console.log();

//   const getproduct = await Product.findOne({ _id: req.body.product});
//   //console.log(getproduct)
//   if (getproduct) {
//     const getstore = await Store.findOne({ _id: getproduct.store });

//     const {
//       orderId,
//       product,
//       // qty,
//       // price,
//       // size,
//       // color,
//       // status,
//     } = req.body;

    

//     const newOrderproduct = new Orderproduct({
      
//       product: product,
//       orderId: orderId,
//       // qty: qty,
//       // price: price,
//       //  size: size,
//       // color: color,
//      });

//     const findexist = await Orderproduct.findOne({
//       $and: [
//         { orderId: orderId  },
//         { product: product },
//         // { price: price },
//         // { qty: qty },
//       ],
//     });
//     if (findexist) {
//       await Orderproduct.findOneAndUpdate({
//         $and: [
//           { customer: req.userId },
//           { product: product },
//           // { purchaseprice: purchaseprice },
//           // { qty: qty },
//           // { new: true },
//         ],
//       })
//         .then((data) => {
         
//           res.status(200).json({
//             status: true,
//             msg: "success",
//             data: data,
//           });
//         })
//         .catch((error) => {
//           res.status(200).json({
//             status: false,
//             msg: "error",
//             error: error,
//           });
//         });
//     } else {
//       newOrderproduct.save(function (err, data) {
//         if (err) {
//           res.status(400).json({
//             status: false,
//             msg: "Error Occured",
//             error: err,
//           });
//         } else {
//           res.status(200).json({
//             status: true,
//             msg: "Product added to order",
//             data: data,
//           });
//         }
//       });
//     }
//   }
// };


exports.addoderproduct = async (req, res) => {
  //  const getproduct = await Product.findOne({ _id: req.body.product });
  // console.log(getproduct)
  // if (getproduct) {
  //   const getstore = await Store.findOne({ _id: getproduct.store });

  const {cartId,orderId,status}  = req.body


  const newOrderproduct = new Orderproduct ({
  // seller: getproduct?.seller,
   cartId :cartId,
    orderId :orderId,
   // product : product,
    status : status
  })
  const findexist = await Orderproduct.findOne({orderId : orderId})
  if (findexist){
    await Orderproduct.findOneAndUpdate({orderId:orderId}).then((data)=>{
              res.status(200).json({
                status : true,
                data : data
              })
            }).catch((error)=>{
              res.status(400).json({
                status : false,
                error : error
              })
            })
  }else {
    newOrderproduct.save(function (err, data) {
              if (err) {
                res.status(400).json({
                  status: false,
                  msg: "Error Occured",
                  error: err,
                });
              } else {
                res.status(200).json({
                  status: true,
                  msg: "Product added to order",
                  data: data,
                });
              }
            });
          }
    //    }  
}


exports.getoneorderproduct = async(req,res) => {
  // const getcart = await Cart.findOne({ })
  // const getcart = await Cart.findOne({ _id: req.Seller});
  const findall =await Orderproduct.find({orderId: req.params.id})
  .populate("cartId")
  .populate({
    path: 'cartId',
    populate: {
        path: 'product' 
    }
}).populate({
  path: 'cartId',
  populate: {
      path: 'seller' 
  }
})

.populate({
  path: 'orderId',
  populate: {
      path: 'delivery_address' 
  }
})
  if(findall){
      res.status(200).json({
          status:true,
          msg:"success",
          data:findall
      })
  }else{
      res.status(400).json({
          status:false,
          msg:"error",
          error:"error"
      })
  }

}


// exports.getorderProduct = async (req, res) => {
//   const findall = await Orderproduct.find()
//   .populate("cart")
//   .populate({
//     path: 'cart',
//     populate: {
//         path: 'product' 
//     }
// })
// .populate({
//   path: 'orderId',
//   populate: {
//       path: 'delivery_address' 
//   }
// })
   
//     .then((result) => {
//       res.status(200).json({
//         status: true,
//         msg: "success",
//         data: result,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         status: false,
//         msg: "error",
//         error: "error",
//       });
//     });
// };
  

exports.getorderProduct = async(req,res) => {
  // const getcart = await Cart.findOne({ })
  // const getcart = await Cart.findOne({ _id: req.Seller});

  // const getproduct = await Product.findOne({ _id: req.body.product });
  // console.log(getproduct)
  // if (getproduct) {
  //   const getseller = await Seller.findOne({ _id: getproduct.seller });
  
  const findall =await Orderproduct.find()
  .populate("cartId")
  .populate({
    path: 'cartId',
    populate: {
        path: 'product' 
    }

}).populate([{
  path: 'cartId',
  populate: {
      path: 'seller' 
  }
}])

.populate({
  path: 'orderId',
  populate: {
      path: 'delivery_address' 
  }
})
// .populate({path :'cartId',select :['product' ,'seller']})
  if(findall){
      res.status(200).json({
          status:true,
          msg:"success",
          data:findall
      })
  }else{
      res.status(400).json({
          status:false,
          msg:"error",
          error:"error"
      })
  }
  //}
}