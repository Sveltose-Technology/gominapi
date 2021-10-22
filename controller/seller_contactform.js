const Sellercontactform = require("../models/seller_contactform");

exports.addcontact_form = async (req, res) => {
  const { your_name, email_address, subject, message } = req.body;

  const newSelleercontactform = new Sellercontactform({
    your_name: your_name,
    email_address: email_address,
    subject: subject,
    message: message,
  });
  const findexist = await Sellercontactform.findOne({
    email_address: email_address,
  });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exists",
      data: {},
    });
  } else {
    newSelleercontactform
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
};

exports.getcontact_form = async (req, res) => {
  const findall = await Sellercontactform.find().sort({ sortorder: 1 });

  if (findall) {
    res.status(200).json({
      status: true,
      msg: "Success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "erorr",
      error: error,
    });
  }
};

exports.viewone_contactform = async (req, res) => {
  const findOne = await Sellercontactform.findOne({ _id: req.body.params });
  if (findOne) {
  }
};
