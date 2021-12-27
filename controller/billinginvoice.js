const Billinginvoice = require("../models/billinginvoice");
 

exports.addbillinginvoice = async (req, res) => {
  const {
    orderId,
    customer,
    quantity,
    total_amount,
    action
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

    
  
  const newBillinginvoice = new Billinginvoice({
    orderId : randomString,
    customer :customer,
    quantity : quantity,
    total_amount : total_amount,
    action: action

  });
  newBillinginvoice.save().then((data) => {
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

exports.getbillinglist = async (req, res) => {
  const findall = await Billinginvoice.find()
    .sort({ sortorder: 1 }).then((data) => {
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





