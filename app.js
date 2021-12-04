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
const staff = require("./routes/staff");
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
const orderproduct = require("./routes/orderproduct");
const wallet = require("./routes/wallet");
const aboutus = require("./routes/aboutus");
const unit = require("./routes/unit");
const altunit = require("./routes/altunit");
const privacypolicy = require("./routes/privacypolicy");
const cart = require("./routes/cart");
const contact_form = require("./routes/contact_form");
 const termsandconditions = require("./routes/termsandconditions")
//const user_address = require("./routes/user_address");
const addwishlist = require("./routes/addwishlist");
const employee = require("./routes/employee");
const supplier = require("./routes/supplier");
const role = require("./routes/role");
const coupon = require("./routes/coupon");

//use
app.use("/", customer);
app.use("/", product);
app.use("/", productcategory);
app.use("/", seller);
app.use("/", staff);
app.use("/", productsubcategory);
app.use("/", brand);
app.use("/", banner);
app.use("/", store);
app.use("/", store_request);
app.use("/", offer);
app.use("/", seller_contactform);
app.use("/", orderproduct);
app.use("/", wallet);
app.use("/", aboutus);
app.use("/", unit);
app.use("/", altunit);
app.use("/", privacypolicy);
app.use("/", cart);
app.use("/", contact_form);
app.use("/", termsandconditions);
// app.use("/", user_address);
app.use("/", addwishlist);
app.use("/", employee);
app.use("/", supplier);
app.use("/", role);
app.use("/", coupon);

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
