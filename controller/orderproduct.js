 const Orderproduct = require("../models/orderproduct");
 const Store = require("../models/store");
// const { v4: uuidv4 } = require("uuid");
 const Seller = require("../models/seller");
 const Product = require("../models/product");
const Cart = require("../models/cart");
const store = require("../models/store");
   

exports.addoderproduct = async (req, res) => {
    const getcart = await Cart.findOne({ _id: req.body.cartId });
  console.log(getcart)
   if (getcart) {
     const getproduct = await Product.findOne({ _id: getcart.product });
 
  const {cartId,orderId,status}  = req.body

  const newOrderproduct = new Orderproduct ({
   seller: getproduct?.seller,
   cartId :cartId, 
    orderId :orderId,
     status : status
  })
  const findexist = await Orderproduct.findOne({cartId :cartId})
  if (findexist){
    await Orderproduct.findOneAndUpdate({cartId:cartId}).then((data)=>{
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
        }  
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
}).populate("seller")

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


exports.getoneorderbyseller = async(req,res) => {
  // const getcart = await Cart.findOne({ })
  // const getcart = await Cart.findOne({ _id: req.Seller});
  const findall =await Orderproduct.find({ $and: [{ seller: req.sellerId }, { _id: req.params.id }]})
   
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
}).populate("seller")

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


exports.getorderProductbyseller = async(req,res) => {
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
}]).populate("seller")

.populate({
  path: 'orderId',
  populate: {
      path: 'delivery_address' 
  }
}).populate({
  path: 'cartId',
  populate: {
      path: 'customer' 
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

exports.delivered_order = async (req, res, next) => {
  const datas = await Orderproduct.find({ status: "Deliver" })
    
    //$and: [{ orderId: req.params.id }, { status: "Deliver" }],

    .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: false,
        error: err,
      });
    });
};



exports.updateOrderStatusbyseller = (req, res) => {
  Orderproduct.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } },{ new: true } ,(err, order) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(order);
  });
};