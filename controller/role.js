const Role = require("../models/role");
const seller = require("../models/seller");

exports.add_role = async (req, res) => {};

exports.addrole = async (req, res) => {
  const {
    dashboard,
    emp,
    store,
    contacts,
    // employee,
    // customer,
    inventory,
    stockControl,
    offers,
    coupons,
    subscription,
    billing,
    order,
    purcahse,
    reports,
    // notification,
    rolesPermission,
    setting,
  } = req.body;

  const newRole = await new Role({
    addemp: req.sellerId,
    emp: emp,
    dashboard: dashboard,
    store: store,
    contacts: contacts,
    inventory: inventory,
    stockControl: stockControl,
    offers: offers,
    coupons: coupons,
    subscription: subscription,
    billing: billing,
    order: order,
    purcahse: purcahse,
    reports: reports,
    rolesPermission: rolesPermission,
    setting: setting,
  });

  // const findexist = await Role.findOne({ role_name: role_name });
  // if (findexist) {
  //     res.status(400).json({
  //         status: false,
  //         msg: "Already Exists",
  //         data: {},
  //     });
  // } else {
  newRole
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
};
//};

exports.allrole = async (req, res) => {
  const findall = await Role.find({ addemp: req.sellerId })
    .populate("addemp")
    .populate("emp");
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

exports.edit_role = async (req, res) => {
  const findandUpdateEntry = await Role.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
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
};

exports.viewonerole = async (req, res) => {
  const findone = await Role.findOne({ addemp: req.sellerId })
    .populate("addemp")
    .populate("emp");
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

exports.del_role = async (req, res) => {
  try {
    const deleteentry = await Role.deleteOne({ _id: req.params.id });
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
