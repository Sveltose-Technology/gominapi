const Coupon = require("../models/coupon");

exports.createoffer = async (req, res) => {
  const {
    offer_code,
    description,
    startDate,
    endDate,
    usage_limit,
    amount,
    isPercent,
    //discount,
    isActive,
  } = req.body;

  create_random_string(6);
  function create_random_string(string_length) {
    (random_string = ""),
      (characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz");
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }

  const newCoupon = new Coupon({
    // customer_name: customer_name,
    offer_code: random_string,
    description: description,
    startDate: startDate,
    endDate: endDate,
    usage_limit: usage_limit,
    amount: amount,
    isPercent: isPercent,
    // discount: discount,
    isActive: isActive,
  });
  newCoupon
    .save()
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
        msg: "coupon created",
        data: newCoupon,
      });
    });
};

//   (function (err, data) {
//     if (err) {
//       res.status(400).json({
//         status: false,
//         msg: "error occured",
//         error: err,
//       });
//     } else {
//       res.status(200).json({
//         status: true,
//         msg: "coupon created",
//         data: newCoupon,
//       });
//     }
//   });
// };
