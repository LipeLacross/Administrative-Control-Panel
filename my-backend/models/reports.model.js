const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now } // Define uma data padrão
});

module.exports = mongoose.model('Report', ReportSchema);
