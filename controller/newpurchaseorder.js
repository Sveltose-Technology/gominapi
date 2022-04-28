const Purchaseorder = require("../models/newpurchaseorder");
const Seller = require("../models/seller");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
 
exports.addnewpurchaseorder = async (req, res) => {
  const {
    //seller,
    supplier,
    product,
    stock_due,
    gstIn,
    payment_due,
    orderId,
    invoiceNo,
    invoice_date,
    amount,
    transportation_cost,
    grand_total,
    instructions,
    //status,
    //upload_Invoice
  } = req.body;

  create_randomString(12);
  function create_randomString(string_length) {
    (randomString = ""),
      (characters =
        "1234567890");
    for (var i, i = 0; i < string_length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  }


  // generateRandomNumber(6)
  // function generateRandomNumber(numberOfCharacters) {
  //   var randomValues = "";
  //   var stringValues = 'ABCDEFGHIJKLMNOabcdefghijklmnopqrstuvwxyzPQRSTUVWXYZ';
  //   var sizeOfCharacter = stringValues.length;
  //   for (var i = 0; i < numberOfCharacters; i++) {
  //     randomValues = randomValues + stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
  //   }
  //   return randomValues;
  // }
  // console.log(generateRandomNumber(6));
  // str(7);
  // function str(strlength) {
  //   (randomstr = ""),
  //     (chars =
  //       "1234567890");
  //   for (var i, i = 0; i < strlength; i++) {
  //     randomstr += chars.charAt(
  //       Math.floor(Math.random() * chars.length)
  //     );
  //   }
  //   return randomstr;
  // }




  const invoiceDate = new Date();
  invoiceDate.getTime();

  const newpurchaseorder = new Purchaseorder({
    seller: req.sellerId,
    supplier: supplier,
    product: product,
    stock_due: stock_due,
    gstIn: gstIn,
    payment_due: payment_due,
   orderId: randomString,
    invoiceNo: randomString,
    invoice_date: invoiceDate,
    amount: amount,
    transportation_cost: transportation_cost,
    grand_total : grand_total,
    instructions : instructions,
   // status : status,
   // upload_Invoice : upload_Invoice
  });

  if (req.file) {
    const findexist = await Purchaseorder.findOne({
      seller:req.sellerId
    })
    const resp = await cloudinary.uploader.upload(req.file.path);
    // if (resp) {
    newSeller.upload_Invoice = resp.secure_url;
    fs.unlinkSync(req.file.path);
  }
  newpurchaseorder.save().then((data) => {
    res.status(200).json({
      status: true,
      msg: "successfully Order",
      data: data
    })
  })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error
      })
    })

};


 
exports.getpurchaseorder = async (req, res) => {
  const findall = await Purchaseorder.find({ $or: [{seller : req.sellerId}, { status: "Approve",status:"Decline"}],
})
    .sort({ sortorder: 1 }).populate("product")
    .populate("supplier").then((data) => {
      res.status(200).json({
        status: true,
        msg: "success",

        data: data

      })
    }).catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error
      })
    })
};


exports.editnewpurchaseorder = async (req, res) => {
  const { status,upload_Invoice,supplier,stock_due,gstIn,payment_due,invoice_date,amount ,transportation_cost,grand_total,instructions} = req.body;

  data = {};
  if (status) {
    data.status = status;
  };
  if(supplier){
  data.supplier = supplier
  };
  if(stock_due){
    data.stock_due = stock_due
  };
  if(gstIn){
    data.gstIn = gstIn
  };
  if(payment_due){
    data.payment_due = payment_due
  };
  if(invoice_date){
    data.invoice_date = invoice_date
  };
  if(transportation_cost){
    data.transportation_cost = transportation_cost
  };
  if(instructions){
    data.instructions = instructions
  }

  
  //console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.upload_Invoice = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  //console.log(data);
  if (data) {
  const findandUpdateEntry = await Purchaseorder.findOneAndUpdate(
    {
      $and: [{ seller: req.sellerId }, { _id: req.params.id }],
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
}
}


exports.getonepurchaseorder = async (req, res) => {
  const findone = await Purchaseorder.findOne({  $and: [{ seller: req.sellerId }, { _id: req.params.id }], }).populate("product").populate("supplier") .populate({
    path: "product",
    populate: {
      path: "productname",
    },
  }).populate("seller")
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
exports.delpurchaseorder = async (req, res) => {
  try {
    const deleteentry = await Purchaseorder.deleteOne({ _id: req.params.id });
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

 
exports.pendingpurchaseorderlist = async (req, res) => {
  const findall = await Purchaseorder.find({
    $and: [{ id: req.sellerId }, { status: "Pending"}],
  }).populate("supplier")
       //{status : "Approve"}
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

 


 