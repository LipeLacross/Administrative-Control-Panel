const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configurações
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Configuração do MongoDB
const dbConfig = require('./config/db.config');
mongoose.connect(dbConfig.url)
  .then(() => {
    console.log('MongoDB conectado!');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit();
  });

// Rotas
const inventoryRoutes = require('./routes/inventory.routes');
const salesRoutes = require('./routes/sales.routes');
const reportsRoutes = require('./routes/reports.routes');

app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/reports', reportsRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
