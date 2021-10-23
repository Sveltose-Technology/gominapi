const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
//const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

//require
const user = require("./routes/user");
const staff = require("./routes/staff");
const product = require("./routes/product");
const productcategory = require("./routes/productcategory");
const seller = require("./routes/seller");
const productsubcategory = require("./routes/productsubcategory");
const brand = require("./routes/brand");
const banner = require("./routes/banner");
const store = require("./routes/store");
const store_request = require("./routes/store_request");
const seller_contactform = require("./routes/seller_contactform");

//use
app.use("/", user);
app.use("/", product);
app.use("/", productcategory);
app.use("/", seller);
app.use("/", staff);
app.use("/", productsubcategory);
app.use("/", brand);
app.use("/", banner);
app.use("/", store);
app.use("/", store_request);
app.use("/", seller_contactform);

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
