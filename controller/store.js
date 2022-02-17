const Store = require("../models/store");
// const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");
//console.log()
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
const product = require("../models/product");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addstore = async (req, res) => {
  const {
   // seller,
    store_name,
    storeImg,
    store_desc,
    websiteUrl,
    store_email,
    phone_no,
    altphone_no,
    altphone_no2,
    day,
    openingTym,
    closingTym,
    address_line1,
    address_line2,
    landmark,
    state,
    city,
    pincode,
    gst_no,
    business_type,
    pan_no,
    company_panno,
    address_proof,
    shoplogo_img,
    gstImg,
    storepan_img,
    tradelicence_img,
    companypan_img,
    address_proof_img,
    trendingPoint,
    sortorder,
    status,
    //verifystore,
  } = req.body;

  const newStore = new Store({
    seller: req.sellerId,
    store_name: store_name,
    store_desc: store_desc,
    websiteUrl: websiteUrl,
    store_email: store_email,
    phone_no: phone_no,
    altphone_no: altphone_no,
    //altphone_no2: altphone_no2,
    day: day,
    openingTym: openingTym,
    closingTym: closingTym,
    address_line1: address_line1,
    address_line2: address_line2,
    landmark: landmark,
    state: state,
    city: city,
    pincode: pincode,
    gst_no: gst_no,
    business_type: business_type,
    pan_no: pan_no,
    company_panno: company_panno,
    address_proof: address_proof,
    trendingPoint : trendingPoint,
    //gstImg: gstImg,
    // storepan_img: storepan_img,
    // tradelicence_img: tradelicence_img,
    // companypan_img: companypan_img,
    // address_proof_img: address_proof_img,
    sortorder: sortorder,
    status: status,
    //verifystore: verifystore,
  });

  const findexist = await Store.findOne({ phone_no: phone_no });
  if (findexist) {
    res.status(400).json({
      status: false,
      msg: "Already Exist",
      data: {},
    });
  } else if (req.files) {
    if (req.files.storeImg[0].path) {
      alluploads = [];
      for (let i = 0; i < req.files.storeImg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.storeImg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.storeImg[i].path);
        alluploads.push(resp.secure_url);
      }
      newStore.storeImg = alluploads;
    }

    if (req.files.shoplogo_img[0].path) {
      // console.log(req.files.shoplogo_img);
      shoplogo_arry = [];
      //console.log(req.files.shoplogo_img.length);
      for (let i = 0; i < req.files.shoplogo_img.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.shoplogo_img[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        // console.log(resp);
        fs.unlinkSync(req.files.shoplogo_img[i].path);
        shoplogo_arry.push(resp.secure_url);
      }
      newStore.shoplogo_img = shoplogo_arry;
      // console.log(newStore);
    }

    if (req.files.gstImg[0].path) {
      //console.log(req.files.gstImg);
      gstImg_arry = [];
      // console.log(req.files.gstImg.length);
      for (let i = 0; i < req.files.gstImg.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.gstImg[i].path,  
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        // console.log(resp);
        fs.unlinkSync(req.files.gstImg[i].path);
        gstImg_arry.push(resp.secure_url);
      }
      newStore.gstImg = gstImg_arry;
      //console.log(newStore);
    }
    if (req.files.storepan_img[0].path) {
      //console.log(req.files.storepan_img);
      storepan_img_arry = [];
      //console.log(req.files.storepan_img.length);
      for (let i = 0; i < req.files.storepan_img.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.storepan_img[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        //console.log(resp);
        fs.unlinkSync(req.files.storepan_img[i].path);
        storepan_img_arry.push(resp.secure_url);
      }
      newStore.storepan_img = storepan_img_arry;
      //console.log(newStore);
    }
    if (req.files.tradelicence_img[0].path) {
      // console.log(req.files.tradelicence_img);
      tradelicence_img_arry = [];
      //console.log(req.files.tradelicence_img.length);
      for (let i = 0; i < req.files.tradelicence_img.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.tradelicence_img[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        //console.log(resp);
        fs.unlinkSync(req.files.tradelicence_img[i].path);
        tradelicence_img_arry.push(resp.secure_url);
      }
      newStore.tradelicence_img = tradelicence_img_arry;
      //console.log(newStore);
    }

    if (req.files.companypan_img[0].path) {
      //console.log(req.files.companypan_img);
      companypan_img_arry = [];
      // console.log(req.files.companypan_img.length);
      for (let i = 0; i < req.files.companypan_img.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.companypan_img[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        //console.log(resp);
        fs.unlinkSync(req.files.companypan_img[i].path);
        companypan_img_arry.push(resp.secure_url);
      }
      newStore.companypan_img = companypan_img_arry;
      // console.log(newStore);
    }

    if (req.files.address_proof_img[0].path) {
      // console.log(req.files.address_proof_img);
      address_proof_img_arry = [];
      //console.log(req.files.address_proof_img.length);
      for (let i = 0; i < req.files.address_proof_img.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.address_proof_img[i].path,
          { use_filename: true, unique_filename: false },
          function (cb) {
            // console.log(cb);
          }
        );
        // console.log(resp);
        fs.unlinkSync(req.files.address_proof_img[i].path);
        address_proof_img_arry.push(resp.secure_url);
      }
      newStore.address_proof_img = address_proof_img_arry;
      //console.log(newStore);
    }

    newStore
      .save()
      .then((result) => {
        res.status(200).json({
          status: true,
          msg: "success",
          data: result,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: false,
          msg: "error",
          error: error,
        });
      });
  } else {
    res.status(200).json({
      status: false,
      msg: "img not uploaded",
    });
  }
};

exports.getstore = async (req, res) => {
  //const getseller = await Seller.findOne({ _id: req.sellerId });
  const findall = await Store.find().populate("seller");
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

// exports.getstorebytoken = async (req, res) => {
//   //const getseller = await Seller.findOne({ _id: req.sellerId });
//   const findall = await Store.find({ seller: req.sellerId }).sort({ sortorder: 1 }).populate("seller");
//   if (findall) {
//     res.status(200).json({
//       status: true,
//       msg: "success",
//       data: findall,
//     });
//   } else {
//     res.status(400).json({
//       status: false,
//       msg: "error",
//       error: "error",
//     });
//   }
// };

exports.getonestore = async (req, res) => {
  const findone = await Store.findOne( { _id: req.params.id  }).populate(
    "seller"
  );
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

exports.getonestorebytoken = async (req, res) => {
  const findone = await Store.findOne({  $and: [{ id: req.sellerId }, { _id: req.params.id }], }).populate(
    "seller"
  );
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


exports.storebyseller = async (req, res) => {
  const findall = await Store.find({ seller: req.sellerId }).populate(
    "seller"
  );
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
      // store: findall,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};

exports.editstore = async (req, res) => {
  const {
    seller,
    store_name,
    storeImg,
    store_desc,
    websiteUrl,
    store_email,
    phone_no,
    altphone_no,
    altphone_no2,
    day,
    startTym,
    endTym,
    address_line1,
    address_line2,
    landmark,
    state,
    city,
    pincode,
    gst_no,
    business_type,
    pan_no,
    company_panno,
    address_proof,
    shoplogo_img,
    gstImg,
    storepan_img,
    tradelicence_img,
    companypan_img,
    address_proof_img,
    sortorder,
    status,
  } = req.body;

  data = {};
  if (seller) {
    data.seller = seller;
  }
  if (store_name) {
    data.store_name = store_name;
  }
  if (store_desc) {
    data.store_desc = store_desc;
  }
  if (websiteUrl) {
    data.websiteUrl = websiteUrl;
  }
  if (store_email) {
    data.store_email = store_email;
  }
  if (phone_no) {
    data.phone_no = phone_no;
  }
  if (altphone_no) {
    data.altphone_no = altphone_no;
  }
  if (altphone_no2) {
    data.altphone_no2 = altphone_no2;
  }
  if (day) {
    data.day = day;
  }
  if (startTym) {
    data.startTym = startTym;
  }
  if (endTym) {
    data.endTym = endTym;
  }
  if (address_line1) {
    data.address_line1 = address_line1;
  }
  if (address_line2) {
    data.address_line2 = address_line2;
  }
  if (landmark) {
    data.landmark = landmark;
  }
  if (state) {
    data.state = state;
  }
  if (city) {
    data.city = city;
  }
  if (pincode) {
    data.pincode = pincode;
  }
  if (gst_no) {
    data.gst_no = gst_no;
  }
  if (business_type) {
    data.business_type = business_type;
  }
  if (pan_no) {
    data.pan_no = pan_no;
  }
  if (company_panno) {
    data.company_panno = company_panno;
  }
  if (address_proof) {
    data.address_proof = address_proof;
  }
  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  if (req.files) {
    if (req.files.storeImg) {
      alluploads = [];
      for (let i = 0; i < req.files.storeImg.length; i++) {
        // console.log(i);
        const resp = await cloudinary.uploader.upload(
          req.files.storeImg[i].path,
          { use_filename: true, unique_filename: false }
        );
        fs.unlinkSync(req.files.storeImg[i].path);
        alluploads.push(resp.secure_url);
      }
      // newStore.storeImg = alluploads;
      data.storeImg = alluploads;
    }

    if (req.files.shoplogo_img) {
      // console.log(req.files.shoplogo_img);
      shoplogo_arry = [];
      //console.log(req.files.shoplogo_img.length);
      for (let i = 0; i < req.files.shoplogo_img.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.shoplogo_img[i].path,
          { use_filename: true, unique_filename: false }

          // function (cb) {
          // console.log(cb);
          //}
        );
        // console.log(resp);
        fs.unlinkSync(req.files.shoplogo_img[i].path);
        shoplogo_arry.push(resp.secure_url);
      }
      data.shoplogo_img = shoplogo_arry;
      // console.log(newStore);
    }

    if (req.files.gstImg) {
      //console.log(req.files.gstImg);
      gstImg_arry = [];
      // console.log(req.files.gstImg.length);
      for (let i = 0; i < req.files.gstImg.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.gstImg[i].path,
          { use_filename: true, unique_filename: false }

          //function (cb) {
          // console.log(cb);
          //}
        );
        // console.log(resp);
        fs.unlinkSync(req.files.gstImg[i].path);
        gstImg_arry.push(resp.secure_url);
      }
      data.gstImg = gstImg_arry;
      //console.log(newStore);
    }
    if (req.files.storepan_img) {
      //console.log(req.files.storepan_img);
      storepan_img_arry = [];
      //console.log(req.files.storepan_img.length);
      for (let i = 0; i < req.files.storepan_img.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.storepan_img[i].path,
          { use_filename: true, unique_filename: false }

          //function (cb) {
          // console.log(cb);
          //}
        );
        //console.log(resp);
        fs.unlinkSync(req.files.storepan_img[i].path);
        storepan_img_arry.push(resp.secure_url);
      }
      data.storepan_img = storepan_img_arry;
      //console.log(newStore);
    }
    if (req.files.tradelicence_img) {
      // console.log(req.files.tradelicence_img);
      tradelicence_img_arry = [];
      //console.log(req.files.tradelicence_img.length);
      for (let i = 0; i < req.files.tradelicence_img.length; i++) {
        //console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.tradelicence_img[i].path,
          { use_filename: true, unique_filename: false }

          //function (cb) {
          // console.log(cb);
          // }
        );
        //console.log(resp);
        fs.unlinkSync(req.files.tradelicence_img[i].path);
        tradelicence_img_arry.push(resp.secure_url);
      }
      data.tradelicence_img = tradelicence_img_arry;
      //console.log(newStore);
    }

    if (req.files.companypan_img) {
      //console.log(req.files.companypan_img);
      companypan_img_arry = [];
      // console.log(req.files.companypan_img.length);
      for (let i = 0; i < req.files.companypan_img.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.companypan_img[i].path,
          { use_filename: true, unique_filename: false }

          //function (cb) {
          // console.log(cb);
          //}
        );
        //console.log(resp);
        fs.unlinkSync(req.files.companypan_img[i].path);
        companypan_img_arry.push(resp.secure_url);
      }
      data.companypan_img = companypan_img_arry;
      // console.log(newStore);
    }

    if (req.files.address_proof_img) {
      // console.log(req.files.address_proof_img);
      address_proof_img_arry = [];
      //console.log(req.files.address_proof_img.length);
      for (let i = 0; i < req.files.address_proof_img.length; i++) {
        // console.log(i);
        // const resp = await cloudinary.uploader.upload(
        //   req.files.shoplogo_img[i].path
        // );
        const resp = await cloudinary.uploader.upload(
          req.files.address_proof_img[i].path,
          { use_filename: true, unique_filename: false }

          //function (cb) {
          // console.log(cb);
          //}
        );
        // console.log(resp);
        fs.unlinkSync(req.files.address_proof_img[i].path);
        address_proof_img_arry.push(resp.secure_url);
      }
      data.address_proof_img = address_proof_img_arry;
      //console.log(newStore);
    }
  }
  //console.log(data);
  if (data) {
    const findandUpdateEntry = await Store.findOneAndUpdate(
      {
        $and: [{ id: req.sellerId }, { _id: req.params.id }],
      },
      { $set: data },
      { new: true }
    )
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
};

exports.store_req = async (req, res) => {
  const datas = await Store.find({ status: "Inactive" })
    .then((result) => {
      res.status(200).json({
        status: true,
        msg: "success",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    });
};

exports.del_store = async (req, res) => {
  try {
    const deleteentry = await Store.deleteOne({ _id: req.params.id });
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


exports.totalstore = async (req, res) => {
  await Store.countDocuments()
    .then((data) => {
      res.status(200).json({
        status: true,
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
};


//get counts
exports.totalstorebyseller = async (req, res) => {
  await Store.countDocuments({seller :req.sellerId})
    .then((data) => {
      res.status(200).json({
        status: true,
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
};


exports.searchstore = async (req, res) => {
  const { oneinput } = req.body;
  await Store.find({store_name:{$regex: oneinput,$options:"i"}})
    .then((data) => {
      res.status(200).json({
        status: true,
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
};

 exports.browsebytrending_store = async (req,res) =>{
   const findall = await Store.find().sort({trendingPoint : -1}).limit(5) .then((data) => {
    res.status(200).json({
      status: true,
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
};


 