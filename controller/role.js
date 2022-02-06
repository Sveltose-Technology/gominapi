const Role = require("../models/role");
const seller = require("../models/seller");

exports.add_role = async (req, res) => {};

exports.addrole = async (req, res) => {
  // const { role_name,seller,storePermission,customerPermission,empPermission,supplierPermission,productPermission,stockcntrlPermission,offerPermission,couponPermission,billingPermission,purchaseorderPer,purchaseInvoicePer,
  //  store_add, store_edit, store_view, store_delete, customer_add, customer_edit, customer_view, customer_delete,
  // employee_add, employee_edit, employee_view, employee_delete, supplier_add, supplier_edit, supplier_view, supplier_delete,
  // product_add, product_edit, product_view, product_delete, stockcontrol_add, stockcontrol_edit, stockcontrol_view, stockcontrol_delete, offer_add,
  // offer_edit, offer_view, offer_delete, coupon_add, coupon_edit, coupon_view, coupon_delete, billing_add, billing_edit, billing_view, billing_delete, purchaseorder_add, purchaseorder_edit, purchaseorder_view, purchaseorder_delete, purchaseInvoice_add, purchaseInvoice_edit, purchaseInvoice_view, purchaseInovice_delete
  // } =

  const {
    role_name,
    store,
    employee,
    customer,
    supplier,
    product,
    stockControl,
    offers,
    coupons,
    subscription,
    billing,
    order,
    purcahse,
    reports,
    notification,
    rolesPermission,
    setting,
  } = req.body;

  const newRole = await new Role({
    role_name: role_name,
    store: store,
    employee: employee,
    customer: customer,
    supplier: supplier,
    product: product,
    stockControl: stockControl,
    offers: offers,
    coupons: coupons,
    subscription: subscription,
    billing: billing,
    order: order,
    purcahse: purcahse,
    reports: reports,
    notification: notification,
    rolesPermission: rolesPermission,
    setting: setting,
    // store_add: store_add,
    // store_edit: store_edit,
    // store_view: store_view,
    // store_delete: store_delete,
    // customer_add: customer_add,
    // customer_edit: customer_edit,
    // customer_view: customer_view,
    // customer_delete: customer_delete,
    // employee_add: employee_add,
    // employee_edit: employee_edit,
    // employee_view: employee_view,
    // employee_delete: employee_delete,
    // supplier_add: supplier_add,
    // supplier_edit: supplier_edit,
    // supplier_view: supplier_view,
    // supplier_delete: supplier_delete,
    // product_add: product_add,
    // product_edit: product_edit,
    // product_view: product_view,
    // product_delete: product_delete,
    // stockcontrol_add: stockcontrol_add,
    // stockcontrol_edit: stockcontrol_edit,
    // stockcontrol_view: stockcontrol_view,
    // stockcontrol_delete: stockcontrol_delete,
    // offer_add: offer_add,
    // offer_edit: offer_edit,
    // offer_view: offer_view,
    // offer_delete: offer_delete,
    // coupon_add: coupon_add,
    // coupon_edit: coupon_edit,
    // coupon_view: coupon_view,
    // coupon_delete: coupon_delete,
    // billing_add: billing_add,
    // billing_edit: billing_edit,
    // billing_view: billing_view,
    // billing_delete: billing_delete,
    // purchaseorder_add: purchaseorder_add,
    // purchaseorder_edit: purchaseorder_edit,
    // purchaseorder_view: purchaseorder_view,
    // purchaseorder_delete: purchaseorder_delete,
    // purchaseInvoice_add: purchaseInvoice_add,
    // purchaseInvoice_edit: purchaseInvoice_edit,
    // purchaseInvoice_view: purchaseInvoice_view,
    // purchaseInovice_delete: purchaseInovice_delete
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
  const findall = await Role.find().sort({ sortorder: 1 }).populate("seller");
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

exports.editRole = async (req, res) => {
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
  const findone = await Role.findOne({ _id: req.params.id });
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
