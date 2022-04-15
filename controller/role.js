const Role = require("../models/role");
const seller = require("../models/seller");
//console
exports.add_role = async (req, res) => { };

exports.addrole = async (req, res) => {
  const {
    dashboard,
    emp,
    store,
    addMyStore,
    storeList,
    contacts,
    addEmployee,
    employeeList,
    addCustomer,
    customerList,
    addSupplier,
    supplierList,
    inventory,
    products,
    AddMyProduct,
    productsList,
    stockControl,
    stockTransferRequest,
    stockAdjustment,
    coupons,
    subscription,
    choosePaymentOption,
    subsList,
    billing,
    order,
    purchase,
    newPurchaseOrder,
    purchaseOrderList,
    purchaseInvoiceList,
    reports,
    rolesPermission,
    roleList,
    addRole,
    setting,
    brandList,
    taxList,
    unitList,
    reasonList,
    colourList,
    sizeList,
    productCategory,
    material,
    warehouseList
  } = req.body;

  const newRole = await new Role({
    addemp: req.sellerId,
    emp: emp,
    dashboard: dashboard,
    store: store,
    addMyStore: addMyStore,
    storeList: storeList,
    contacts: contacts,
    addEmployee: addEmployee,
    employeeList: employeeList,
    addCustomer: addCustomer,
    customerList: customerList,
    addSupplier: addSupplier,
    supplierList: supplierList,
    inventory: inventory,
    products: products,
    AddMyProduct: AddMyProduct,
    productsList: productsList,
    stockControl: stockControl,
    stockTransferRequest: stockTransferRequest,
    stockAdjustment: stockAdjustment,
    coupons: coupons,
    subscription: subscription,
    choosePaymentOption: choosePaymentOption,
    subsList: subsList,
    billing: billing,
    order: order,
    purchase: purchase,
    newPurchaseOrder: newPurchaseOrder,
    purchaseOrderList: purchaseOrderList,
    purchaseInvoiceList: purchaseInvoiceList,
    reports: reports,
    rolesPermission: rolesPermission,
    roleList: roleList,
    addRole: addRole,
    setting: setting,
    brandList: brandList,
    taxList: taxList,
    unitList: unitList,
    reasonList: reasonList,
    colourList: colourList,
    sizeList: sizeList,
    productCategory: productCategory,
    material: material,
    warehouseList: warehouseList,
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
  const findone = await Role.findOne({ emp: req.sellerId })
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
