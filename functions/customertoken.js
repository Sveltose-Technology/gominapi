const crypto = require("crypto")
const jwt = require("jsonwebtoken")


exports.customertoken = async (req,res,next) =>{
    let token = req.headers["authorization"]
    
    if(!token){
        return res.status(403).send({message : "No Token Provided"})
    }
 console.log(process.env.TOKEN_SECRET)
 jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded) =>{
     if(err){
         return res.status(401).send({ message : "Unathorized"})
     }
     req.customerId = decoded.customerId
     console.log(req.customerId);

     next();
 })


}