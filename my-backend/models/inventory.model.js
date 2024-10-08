const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  // O _id será gerado automaticamente pelo MongoDB
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
