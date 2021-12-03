const mongoose  = require("mongoose");
const Schema  = mongoose.Schema 

const termsconditionSchema = new mongoose.Schema (
    {
        description  : {
            type : String
        }

},
{ timestamps: true }
)


module.exports = mongoose.model("termsandconditions",termsconditionSchema)