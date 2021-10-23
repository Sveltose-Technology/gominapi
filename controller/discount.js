const Coupon = require("../models/discount");

const discountpprice = async (req, res) => {
  const { discount, originalPrice } = req.body;
  const discountuse = discount / 100;
  const totalPrice = originalPrice - originalPrice * discountuse;

  try {
  } catch {}
};
