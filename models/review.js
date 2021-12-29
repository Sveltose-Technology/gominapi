const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  product : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
   
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment:{
      type : String
}, 
},
{ timestamps: true }
);
 module.exports = mongoose.model("review", ReviewSchema);


 