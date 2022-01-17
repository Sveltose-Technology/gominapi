const Addwishlist = require("../models/addwishlist");
const { v4: uuidv4 } = require("uuid");

exports.addwishlist = async (req, res) => {
  const { product, color, size } = req.body;

  const newAddwishlist = new Addwishlist({
    //  customer: req.userId,
    product: product,
    color: color,
    size: size,
  });
  const findexist = await Addwishlist.findOne({
    $and: [{ customer: req.userId }, { product: product }],
  });
  if (findexist) {
    await Addwishlist.findOneAndUpdate(
      {
        $and: [{ customer: req.userId }, { product: product }],
      },
      { $set: req.body },
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
        res.status(200).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  } else {
    newAddwishlist.save(function (err, data) {
      if (err) {
        res.status(400).json({
          status: false,
          msg: "Error Occured",
          error: err,
        });
      } else {
        res.status(200).json({
          status: false,
          msg: "Product added to wishlist",
          data: data,
        });
      }
    });
  }
};

//   newAddwishlist.save(function (err, data) {
//     if (err) {
//       res.status(400).json({
//         status: false,
//         msg: "Error Occured",
//         error: err,
//       });
//     } else {
//       res.status(200).json({
//         status: true,
//         msg: "Added to Wishlist",
//         data: data,
//       });
//     }
//   });
// };

exports.getonewishlist = async (req, res) => {
  const findone = await Addwishlist.findOne({ _id: req.params.id })
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
        error: "error",
      });
    });
};

exports.getallwishlist = async (req, res) => {
  const findall = await Addwishlist.find({ customer: req.userId })
    .sort({ sortorder: 1 })
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
        error: "error",
      });
    });
};

exports.editwishlist = async (req, res) => {
  const findandUpdateEntry = await Addwishlist.findOneAndUpdate(
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

exports.deletewishlist = async (req, res) => {
  try {
    const deleteentry = await Addwishlist.deleteOne({ _id: req.params.id });
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
