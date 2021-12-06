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

 exports.Getsubscription = async (req, res) => {
    const findall = await Subscription.find().sort({ sortorder: 1 });
    if (findall) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findall,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  };

  exports.getoneSubscription = async (req, res) => {
    const findone = await Subscription.findOne({ _id: req.params.id });
    if (findone) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findone,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  };
  

  exports.del_subscription = async (req, res) => {
    try {
      const deleteentry = await Subscription.deleteOne({ _id: req.params.id });
      res.status(200).json({
        status: true,
        msg: "success",
        data: deleteentry,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        msg: "error",
        error: error,
      });
    }
  };
  


