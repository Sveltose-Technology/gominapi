const Storerequest = require("../models/store_request");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const dotenv = require("dotenv");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addstore_req = async (req, res) => {
  const { store_details, uploaded_document, store_request, status, sortorder } =
    req.body;

  const newStorerequest = new Storerequest({
    store_details: store_details,
    uploaded_document: uploaded_document,
    store_request: store_request,
    status: status,
    sortorder: sortorder,
  });
  if (req.files) {
    const findexist = await Storerequest.findOne({
      store_details: store_details,
    });

    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exist",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.uploaded(req.file.path);
      if (resp) {
        newStorerequest.uploaded_document = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newStorerequest.save().then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
          });
        });
      } else {
        res.status(200).json({
          status: false,
          msg: "Img not Uploaded",
        });
      }
    }
  } else {
    const findexist = await Storerequest.findOne({
      store_details: store_details,
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newStorerequest
        .save()
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
};
