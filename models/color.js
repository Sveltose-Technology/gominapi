const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const colorSchema = new Schema(
  {
  
    color_name : {
         type : String
     },
     status :{
         type :String
     }
   
  
   },
  { timestamps: true }
);
 
module.exports = mongoose.model("color", colorSchema);
