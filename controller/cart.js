const Cart = require("../models/cart");
const { verifytoken } = require("../functions/verifytoken");

exports.addtocartproduct = async (req, res) => {
  // const carttoken = await Cart.findOne({ user: req.userId });

  const { product, product_price, product_qty, color, size } = req.body;

  let total_qty = 0;
   for (let i = 0; i < product.length; i++) {
     total_qty = total_qty + product[i].product_qty;
   }
 
  // let total_amount = 0;
  // for (let i = 0; i < product.length; i++) {
  //   total_amount =total_amount + product[i].product_price;

  // }
  //
  //

  console.log();
  const addtoCart = new Cart({
    customer: req.userId,
    product: product,
    product_price: product_price,
    product_qty: product_qty,
    color: color,
    size: size,
  });

  const findexist = await Cart.findOne({
    $and: [
      { customer: req.userId },
      { product: product },
      { color: color },
      { size: size },
    ],
  });
  if (findexist) {
    await Cart.findOneAndUpdate(
      {
        $and: [{ customer: req.userId }, { product: product }],
      },
      { $set: req.body },
      { new: true }
    )
      .then((data) => {
        res.status(200).json({
          status: true,
          msg: "cart updated",
          data: data,
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
          status: false,
          msg: "Product added to cart",
          data: data,
          total_qty: product_qty,
        });
      }
    });
  }
};

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
    const deleteentry = await Cart.deleteOne({ customer : req.userId,product:req.params.id });
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

//CARTBY // USERID
// exports.cartbyshow = async(req,res) =>{
//   const
// }

exports.cartbycustomer = async (req, res) => {
  const findone = await Cart.find({customer: req.userId })
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
