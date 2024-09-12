const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
  productName: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', SalesSchema);
