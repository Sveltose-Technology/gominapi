const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockadjustmentSchema = new Schema(
    {
        // product:[{
        //     type:Object
        // }],
        product: [
            {
              product :{ type: mongoose.Schema.Types.ObjectId,ref:"product"},availableqty:{type : String},comment:{type : String},value:{type :Number},qty:{type : Number}
            },
          ],
        seller :{
            type : Schema.Types.ObjectId, ref : "seller"
        },
        reference_no :{
         type : Number
        },
        adjustment_date :{
            type : String
        },
        warehouse :{
            type : Schema.Types.ObjectId, ref : "warehouse"
        },
        
        reason : {
            type : Schema.Types.ObjectId, ref : "reason"
        },
        adjusted_qty:{
            type : Number
        },
        adjusted_value : {
            type : String
        },
        grandTotal:{
            type :String,
            default:0
        }
        
    },
    { timestamps: true }
)

module.exports = mongoose.model("stockadjustment", stockadjustmentSchema);
