const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocktransferSchema = new Schema(
    {
        product: [{
            type: Object
          }],
          total_qty: { type: String, },
          total_amount: { type: String, },
          
        reference_no :{
         type : Number
        },

        from_warehouse :{
            type : String
        },
        to_warehouse :{
            type :String
        },
        transfer_date : {
            type : String
        },
        delivery_duedate:{
            type : String
        },
        transfer_type : {
            type :  String
        },
        reason : {
            type : Schema.Types.ObjectId, ref : "reason"
         },
         grandTotal:{
             type :String,
             default:0
         }
          
    },
    { timestamps: true }
)

module.exports = mongoose.model("stocktransfer", stocktransferSchema);
