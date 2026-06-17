const { model } = require("mongoose");
const OrdersSchema = require("../schemas/OrdersSchema"); // Imports the raw schema perfectly

const OrdersModel = model("orders", OrdersSchema);

// Wrapped in an object to match index.js: const { OrdersModel } = require(...)
module.exports = { OrdersModel };