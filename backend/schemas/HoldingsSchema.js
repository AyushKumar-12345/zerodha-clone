const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  // MULTI-USER ISOLATION: Explicitly maps each stock ledger row to a specific account profile
  user: {
    type: String,
    required: true,
    default: "Trader"
  },
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
});

module.exports = { HoldingsSchema };