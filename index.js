const express = require("express");
const app = express();
require("dotenv").config();

app.get("/api", (req, res) => {
  res.send("Hello World!!!!");
});
//console.log(process.env.DATABASE);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
