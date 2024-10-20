const Sale = require('../models/sales.model');
const Inventory = require('../models/inventory.model');

// Buscar todas as vendas
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar uma venda por ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Criar uma nova venda
exports.createSale = async (req, res) => {
  const { productName, amount, price } = req.body;

  try {
    const item = await Inventory.findOne({ name: productName });

    if (!item) {
      return res.status(400).json({ message: 'Product not found in inventory' });
    }

    if (item.quantity < amount) {
      return res.status(400).json({ message: `Insufficient stock for ${productName}` });
    }

    item.quantity -= amount;
    await item.save();

    const newSale = new Sale({
      productName,
      amount,
      price,
      date: new Date(),
    });

    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar uma venda existente
exports.updateSale = async (req, res) => {
  const { productName, amount, price } = req.body;

  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    const item = await Inventory.findOne({ name: productName });
    if (!item) {
      return res.status(400).json({ message: 'Product not found in inventory' });
    }

    const amountDifference = amount - sale.amount;
    if (amountDifference > 0 && item.quantity < amountDifference) {
      return res.status(400).json({ message: `Not enough stock for update` });
    }

    item.quantity -= amountDifference;
    await item.save();

    sale.productName = productName;
    sale.amount = amount;
    sale.price = price;
    await sale.save();

    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deletar uma venda por ID
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    // Encontre o item no inventário relacionado à venda
    const inventoryItem = await Inventory.findOne({ name: sale.productName });

    if (inventoryItem) {
      // Repor a quantidade de estoque que foi vendida
      inventoryItem.quantity += sale.amount;
      await inventoryItem.save();
    }

    await Sale.findByIdAndDelete(req.params.id);
    res.status(204).send(); // Resposta sem conteúdo se a exclusão for bem-sucedida
  } catch (error) {
    console.error('Erro ao deletar venda:', error);
    res.status(500).json({ message: 'Erro ao deletar venda' });
  }
};

// Deletar vendas associadas a um produto específico
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Buscar todas as vendas relacionadas ao produto
    const sales = await Sale.find({ productId: productId });

    for (let sale of sales) {
      const inventoryItem = await Inventory.findOne({ name: sale.productName.toLowerCase() });
      if (inventoryItem) {
        // Repor a quantidade de estoque
        inventoryItem.quantity += sale.amount;
        await inventoryItem.save();
      }
      await Sale.findByIdAndDelete(sale._id);
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};
