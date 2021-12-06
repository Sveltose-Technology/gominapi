const Subscription = require ("../models/subscription")

 exports.addSubscription = async(req,res)=>{
     const{description,duration,sub_plan,status,sortorder}  = req.body
    
     const newSubscription = new Subscription({
         description : description,
         duration : duration,
         sub_plan : sub_plan,
         status : status,
         sortorder : sortorder
     })
     const findandexist = await Subscription.findOne({sub_plan:sub_plan })
     if(findandexist){
         res.status(400).json({
             status : false,
             msg :"Already Exist",
             data : {}
         })
     }else{
        newSubscription.save()
   .then((data) => {
    res.status(200).json({
      status: true,
      msg: "success",
      data: data,
    });
  })
  .catch((error) => {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  });
}
 }