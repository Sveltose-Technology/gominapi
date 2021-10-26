const Wallet = require("../models/wallet");
const { v4: uuidv4 } = require("uuid");

exports.addwallet = async (req, res) => {
  const { first_name, last_name, wallet_balance } = req.body;

  const newWallet = new Wallet({
    first_name: first_name,
    last_name: last_name,
    walletId: uuidv4(),
    wallet_balance: wallet_balance,
  });

  newWallet.save(function (err, data) {
    if (err) {
      res.status(400).json({
        status: false,
        msg: "error occured",
        error: err,
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "Amount added to wallet",
        data: newWallet,
      });
    }
  });
};

exports.getwallet = async (req, res) => {
  const findall = await Wallet.find().sort({ sortorder: 1 });
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
