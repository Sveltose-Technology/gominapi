const { createInvoice } = require("./createInvoice.js");

const invoice = {
  shipping: {
    name: "Deepak Yadav",
    address: "10/2 Bhawani sagar,Dewas",
    city: "Dewas",
    state: "Madhya Pradesh",
    country: "India",
    postal_code: 455001,
  },
  items: [
    {
      item: "Bronse Plan",
      description: "30 days membership plan",
      quantity: 1,
      amount: 25600,
    },
  ],
  subtotal: 25600,
  paid: 25600,
  invoice_nr: 1234,
};

createInvoice(invoice, "invoice.pdf");