const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/sales.controller');

router.get('/', SalesController.getAllSales);
router.get('/:id', SalesController.getSaleById);
router.post('/', SalesController.createSale);
router.put('/:id', SalesController.updateSale);
router.delete('/:id', SalesController.deleteSale);

// Rota para deletar vendas associadas a um produto específico
router.delete('/product/:id', SalesController.deleteProduct);

module.exports = router;
