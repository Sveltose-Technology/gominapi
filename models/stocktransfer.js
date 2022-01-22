const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocktransferSchema = new Schema(
    {
        product : {type: Schema.Types.ObjectId, ref: "product" },
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
            type : Schema.Types.ObjectId, ref : "transfer_type"
        },
        reason : {
            type : Schema.Types.ObjectId, ref : "reason"
         },
    },
    { timestamps: true }
)

module.exports = mongoose.model("stocktransfer", stocktransferSchema);
