const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
  // MULTI-USER SANDBOX ISOLATION: Explicitly maps intra-day active positions to an account identity
  user: {
    type: String,
    required: true,
    default: "Trader"
  },
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

module.exports = { PositionsSchema };