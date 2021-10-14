const Seller = require("../models/seller");

exports.add_seller = async (req, res) => {
  const { seller_name, Description, status, action } = req.body;

  const newSeller = new Seller({
    seller_name: seller_name,
    Description: Description,
    action: action,
    status: status,
  });

  const findexist = await Seller.findOne({ seller_name: seller_name });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newSeller
      .save()
      .then(
        res.status(200).json({
          status: true,
          msg: "success",
          data: newSeller,
        })
      )
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  }
};

exports.getseller = async (req, res) => {
  const findall = await Seller.find({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      error: "error",
      data: findall,
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
