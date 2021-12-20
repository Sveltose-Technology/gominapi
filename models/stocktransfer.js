const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocktransferSchema = new Schema(
    {
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
            type : String
        },
        reason : {
            type : String
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("stocktransfer", stocktransferSchema);
