const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//require
const customer = require("./routes/customer");
//const staff = require("./routes/staff");
const product = require("./routes/product");
const productcategory = require("./routes/productcategory");
const seller = require("./routes/seller");
const productsubcategory = require("./routes/productsubcategory");
const brand = require("./routes/brand");
const banner = require("./routes/banner");
const store = require("./routes/store");
const store_request = require("./routes/store_request");
const offer = require("./routes/offer");
const seller_contactform = require("./routes/seller_contactform");
//const order = require("./routes/order");
const wallet = require("./routes/wallet");
const aboutus = require("./routes/aboutus");
const unit = require("./routes/unit");
const altunit = require("./routes/altunit");
const privacypolicy = require("./routes/privacypolicy");
const cart = require("./routes/cart");
const contact_form = require("./routes/contact_form");
 const termsandconditions = require("./routes/termsandconditions")
const user_address = require("./routes/user_address");
const addwishlist = require("./routes/addwishlist");
const employee = require("./routes/employee");
const supplier = require("./routes/supplier");
const role = require("./routes/role");
const coupon = require("./routes/coupon");
const adminlogin = require("./routes/adminlogin");
const subscription = require("./routes/subscription");
const cus_slider = require("./routes/cus_slider");
const warehouse = require("./routes/warehouse");
const material = require("./routes/material");
const stocktransfer = require("./routes/stocktransfer");
const stockadjustment = require("./routes/stockadjustment");
const trendingstore = require("./routes/trendingstore");
const newpurchaseorder = require("./routes/newpurchaseorder");
const gstrate = require("./routes/gstrate");
const payment = require("./routes/payment");

 const billinginvoice = require("./routes/billinginvoice");
const review = require("./routes/review");
//const mail = require("./routes/mail");
 
const color = require("./routes/color");
const size = require("./routes/size");
const reason = require("./routes/reason");
const transfer_type = require("./routes/transfer_type");

const orderproduct = require("./routes/orderproduct");
 
 

 
 

//use
app.use("/", customer);
app.use("/", product);
app.use("/", productcategory);
app.use("/", seller);
//app.use("/", staff);
app.use("/", productsubcategory);
app.use("/", brand);
app.use("/", banner);
app.use("/", store);
app.use("/", store_request);
app.use("/", offer);
app.use("/", seller_contactform);
//app.use("/", order);
app.use("/", wallet);
app.use("/", aboutus);
app.use("/", unit);
app.use("/", altunit);
app.use("/", privacypolicy);
app.use("/", cart);
app.use("/", contact_form);
app.use("/", termsandconditions);
app.use("/", user_address);
app.use("/", addwishlist);
app.use("/", employee);
app.use("/", supplier);
app.use("/", role);
app.use("/", coupon);
app.use("/", adminlogin);
app.use("/", subscription);
app.use("/", cus_slider);
app.use("/", warehouse);
app.use("/", material);
app.use("/", stocktransfer);
app.use("/", stockadjustment);
app.use("/", trendingstore);
app.use("/", newpurchaseorder);
app.use("/", gstrate);
 app.use("/", billinginvoice);
app.use("/", review);
//app.use("/", mail);
app.use("/", color);
app.use("/", size);
app.use("/", reason);
app.use("/", transfer_type);
app.use("/", orderproduct);
app.use("/", payment);
 
 

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

//console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useNewUrlParser: true,                 
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED SUCCEFULLY");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Example app listening on port 5000");
});

//    http://localhost:5000/admin
