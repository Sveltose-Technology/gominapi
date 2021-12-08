 const Invoice = require("invoice.js");


const invoiceDetail = {
    oderdetail: {
        OrderId: "001",
        ProductName :"Top",
        sku : 565462,
        hsn : 6464626,
        qty :2,
        price: "300",
        gst : "354562",
        cgst: "65644",
      sgst: "MP",
      total: "300",
    },
    invoiceTotal: [
      {
        subtotal: "350",
        discount: "10%",
        groundTotal: 300,
        price: 200.00, 
        tax: "10%"
      },
       
    ],
    subtotal: 450,
    total: 450,
    order_number: 1234222,
    header:{
        company_name: "Buynaa",
        gstn : 7473663,
        phone : 73476636,
        email : "buyna123@gmail.com",
        company_logo: "assets/images/logo.svg",
        company_address: "Buynaa ,Bangolre"
    },
    footer:{
      text: "This is footer - you can add any text here"
    },
    // currency_symbol:"₹", 
    // date: {
    //   billing_date: "25 November 2021",
    //   due_date: "1 December 2021",
    // }
};

Invoice(invoiceDetail, 'invoice.pdf');

