const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const sizeSchema = new Schema(
  {
  
     size_name : {
         type : String
     },
     status :{
         type :String
     }
   
  
   },
  { timestamps: true }
);
 
module.exports = mongoose.model("size", sizeSchema);
