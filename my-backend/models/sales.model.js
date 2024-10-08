const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
  // O _id é gerado automaticamente, então não precisa ser declarado aqui
});

module.exports = mongoose.model('Sale', saleSchema);
