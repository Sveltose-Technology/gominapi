const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockadjustmentSchema = new Schema(
    {
        reference_no :{
         type : Number
        },
        adjustment_date :{
            type : String
        },
        warehouse :{
            type :String
        },
        reason : {
            type : String
        },
        adjusted_qty:{
            type : Number
        },
        adjusted_value : {
            type : String
        },
        
    },
    { timestamps: true }
)

module.exports = mongoose.model("stockadjustment", stockadjustmentSchema);
