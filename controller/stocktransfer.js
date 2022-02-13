const Stocktransfer = require("../models/stocktransfer");

exports.addstocktransfer = (req, res) => {
  const {
    product,
    reference_no,
    from_warehouse,
    to_warehouse,
    transfer_date,
    delivery_duedate,
    transfer_type,
    reason,
    grandTotal,
  } = req.body;

  let total_qty = 0;
  for (let i = 0; i < product.length; i++) {
    total_qty = total_qty + product[i].qty;
  }

  let total_amount = 0;
  for (let i = 0; i < product.length; i++) {
    total_amount = total_amount + product[i].amount;
  }

  const newStocktransfer = new Stocktransfer({
    seller: req.sellerId,
    product: product,
    reference_no: reference_no,
    from_warehouse: from_warehouse,
    to_warehouse: to_warehouse,
    transfer_date: transfer_date,
    delivery_duedate: delivery_duedate,
    transfer_type: transfer_type,
    reason: reason,
    total_qty: total_qty,
    total_amount: total_amount,
    grandTotal: grandTotal,
  });
  newStocktransfer
    .save()
    .then((data) => {
      res.status(200).json({
        status: true,
        msg: "add successfully",
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

exports.editstocktranfer = async (req, res) => {
  const findandUpdateEntry = await Stocktransfer.findOneAndUpdate(
    {
      seller: req.sellerId,
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

exports.getstocktransfer = async (req, res) => {
  const findall = await Stocktransfer.find({ seller: req.sellerId })
    .sort({ sortorder: 1 })
    .populate("reason")
    .populate("to_warehouse")
    .populate("from_warehouse")
    .populate({
      path: "product",
      populate: {
        path: "product",
      },
    });
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

exports.getonestocktransfer = async (req, res) => {
  const findone = await Stocktransfer.findOne({
    $and: [{ seller: req.sellerId }, { _id: req.params.id }],
  })
    .populate("reason")
    .populate("to_warehouse")
    .populate("from_warehouse");
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
exports.delstocktransfer = async (req, res) => {
  try {
    const deleteentry = await Stocktransfer.deleteOne({ _id: req.params.id });
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
