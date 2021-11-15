const Store = require("../models/store");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addstore = async (req, res) => {
  const {
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

  const newStore = new Store({
    store_name: store_name,
    store_desc: store_desc,
    websiteUrl: websiteUrl,
    store_email: store_email,
    phone_no: phone_no,
    altphone_no: altphone_no,
    altphone_no2: altphone_no2,
    day: day,
    startTym: startTym,
    endTym: endTym,
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
    //gstImg: gstImg,
    // storepan_img: storepan_img,
    // tradelicence_img: tradelicence_img,
    // companypan_img: companypan_img,
    // address_proof_img: address_proof_img,
    sortorder: sortorder,
    status: status,
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
          req.files.storeImg[i].path
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
  const findall = await Store.find().sort({ sortorder: 1 });
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

exports.getonestore = async (req, res) => {
  const findone = await Store.findOne({ _id: req.params.id });
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
