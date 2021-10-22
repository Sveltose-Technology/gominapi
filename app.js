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
app.use("/api", user);
app.use("/api", product);
app.use("/api", productcategory);
app.use("/api", seller);
app.use("/api", staff);
app.use("/api", productsubcategory);
app.use("/api", brand);
app.use("/api", banner);
app.use("/api", store);
app.use("/api", store_request);
app.use("/api", seller_contactform);

app.get("/api", (req, res) => {
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
