const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  // MULTI-USER TRANSACTIONAL ISOLATION: Binds this order record to a specific user session string
  user: {
    type: String,
    required: true,
    default: "Trader"
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

/* Export the schema object cleanly as the default export */
module.exports = OrdersSchema;