const Brand = require("../models/brand");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.addbrand = async (req, res) => {
  const { name, brand_img, desc, sortorder, status } = req.body;

  const newBrand = new Brand({
    seller :req.sellerId,
    name: name,
    desc: desc,
    brand_img: brand_img,
    sortorder: sortorder,
    status: status,
  });

  if (req.file) {
    const findexist = await Brand.findOne({
      $and:[{seller: req.sellerId},{name: name}]});
    if (findexist) {
      await Brand.findOneAndUpdate(
        {
          $and :[{seller: req.sellerId},{name :name}
          ]
      },
      {new :true}
      )
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      const resp = await cloudinary.uploader.upload(req.file.path);
      if (resp) {
        newBrand.brand_img = resp.secure_url;
        fs.unlinkSync(req.file.path);
        newBrand.save().then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBrand,
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
  else {
    const findexist = await Brand.findOne({  
      $and:[{seller: req.sellerId},{name: name}]});
    if (findexist) {
      await Brand.findOneAndUpdate(
        {
          $and :[{seller: req.sellerId},{name :name}
          ]
      },
      {new :true}
      )
      res.status(400).json({
        status: false,
        msg: "Already Exists",
        data: {},
      });
    } else {
      newBrand
        .save() 
        .then(
          res.status(200).json({
            status: true,
            msg: "success",
            data: newBrand,
          })
        )
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

exports.editbrand = async (req, res) => {
  const { name, brand_img, desc, sortorder, status } = req.body;

  data = {};
  if (name) {
    data.name = name;
  }
  if (desc) {
    data.desc = desc;
  }
  if (sortorder) {
    data.sortorder = sortorder;
  }
  if (status) {
    data.status = status;
  }
  console.log(req.file);
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    data.brand_img = response.secure_url;
    fs.unlinkSync(req.file.path);
  }
  console.log(data);
  if (data) {
    const findandUpdateEntry = await Brand.findOneAndUpdate(
      {
        $and: [{ id: req.sellerId }, { _id: req.params.id }],
      },
      { $set: data },
      { new: true }
    );

    if (findandUpdateEntry) {
      res.status(200).json({
        status: true,
        msg: "success",
        data: findandUpdateEntry,
      });
    } else {
      res.status(400).json({
        status: false,
        msg: "error",
        error: "error",
      });
    }
  }
};

exports.viewonebrand = async (req, res) => {
  const findone = await Brand.findOne({ $and :[{seller : req.sellerId},{_id: req.params.id }]}).populate("seller")
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

exports.allbrand = async (req, res) => {
  const findall = await Brand.find().sort({ sortorder: 1 })
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
exports.allbrandbyseller = async (req, res) => {
  const findall = await Brand.find({seller : req.sellerId}).sort({ sortorder: 1 }).populate("seller")
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

exports.deletebrand = async (req, res) => {
  try {
    const deleteentry = await Brand.deleteOne({ _id: req.params.id });
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

exports.brand_img = async (req, res) => {
  const findone = await Brand.findOne({ _id: req.params.id });
  if (findone) {
    //console.log(req.params.id);
    //console.log(req.file);
    const response = await cloudinary.uploader.upload(req.file.path);
    if (response) {
      const findandUpdateEntry = await Brand.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { brand_img: response.secure_url } },
        { new: true }
      );

      if (findandUpdateEntry) {
        res.status(200).json({
          status: true,
          msg: "success",
          data: findandUpdateEntry,
        });
      } else {
        res.status(400).json({
          status: false,
          msg: "Image not set",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        msg: "Error in file uploading",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      msg: "Brand image Not Found",
    });
  }
};

exports.search_brand = (req, res) => {
  const inputsearch = req.body.inputsearch;
  Brand.find({ name: { $regex: inputsearch, $options: "5" } }).then((data) => {
    res.send(data);
  });
};

exports.totalbrand = async(req,res) => {
  await Brand.countDocuments().then((data)=>{
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
  })
}



exports.totalbrandbyseller = async(req,res) => {
  await Brand.countDocuments({seller: req.sellerId}).then((data)=>{
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
  })
}

