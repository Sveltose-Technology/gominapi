const TrendingStore = require("../models/trendingstore");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addtrendingstore= async (req, res) => {
  const { trending_title, store, store_img } = req.body;

  const newTrendingStore = new TrendingStore({
    trending_title: trending_title,
    store: store,
    store_img: store_img,
  });
  if (req.file) {
    const findexist = await TrendingStore.findOne({
      trending_title: trending_title,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      //console.log(req.file);
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newTrendingStore.store_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newTrendingStore.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newTrendingStore,
          })
        );
      } else {
        res.status(200).json({
          status: false,
          msg: "img not uploaded",
        });
      }
    }
  }  
}
// exports.edit_trendingstore = async (req, res) => {
//   const findandUpdateEntry = await Promotedbrand.findOneAndUpdate(
//     {
//       _id: req.params.id,
//     },
//     { $set: req.body },
//     { new: true }
//   );
//   //.populate("product");
//   if (findandUpdateEntry) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findandUpdateEntry,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

exports.gettrendingstore = async (req, res) => {
  const findall = await TrendingStore.find().sort({ sortorder: 1 });

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

exports.del_trendingstore = async (req, res) => {
  try {
    const deleteentry = await TrendingStore.deleteOne({
      _id: req.params.id,
    });

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

exports.viewonetrendingstore = async (req, res) => {
  const findone = await TrendingStore.findOne({ _id: req.params.id });
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

// exports.edit = async(req,res)=>{
//   const findoneupdate   = await TrendingStore.findOne({

//   }) 
// }
