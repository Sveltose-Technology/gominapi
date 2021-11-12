const Coupon = require("../models/coupon");

exports.addcoupon = async (req, res) => {
  const {
    customer_name,
    contact_no,
    offer_code,
    duration,
    expireDate,
    amount,
    isPercent,
    isActive,
  } = req.body;

  const newCoupon = new Coupon({
    customer_name: customer_name,
    contact_no: contact_no,
    offer_code: offer_code,
    duration: duration,
    expireDate: expireDate,
    amount: amount,
    isPercent: isPercent,
    isActive: isActive,
  });
};
