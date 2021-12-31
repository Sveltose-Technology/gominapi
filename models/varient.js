const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const varientSchema = new Schema(
  {
  
    variation :[{
  type : Object
    }],
      
   },
  { timestamps: true }
);
 
module.exports = mongoose.model("varient", varientSchema);
