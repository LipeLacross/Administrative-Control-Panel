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
  const { productName, amount, price } = req.body;  // Incluindo 'price' no corpo da requisição

  try {
    // Verificar se o produto existe no inventário
    const item = await Inventory.findOne({ name: productName });

    if (!item) {
      return res.status(400).json({ message: 'Product not found in inventory' });
    }

    // Verificar se a quantidade solicitada está disponível no estoque
    if (item.quantity < amount) {
      return res.status(400).json({ message: `Insufficient stock for ${productName}` });
    }

    // Atualizar o estoque
    item.quantity -= amount;
    await item.save();

    // Criar a venda com o preço correto
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
    // Verificar se a venda existe
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    // Verificar se o produto existe no inventário
    const item = await Inventory.findOne({ name: productName });
    if (!item) {
      return res.status(400).json({ message: 'Product not found in inventory' });
    }

    // Verificar se a quantidade solicitada está disponível no estoque
    if (item.quantity < amount) {
      return res.status(400).json({ message: `Insufficient stock for ${productName}` });
    }

    // Atualizar o estoque conforme a diferença de quantidade (se aplicável)
    const amountDifference = amount - sale.amount;
    if (amountDifference > 0 && item.quantity < amountDifference) {
      return res.status(400).json({ message: `Not enough stock for update` });
    }
    item.quantity -= amountDifference;
    await item.save();

    // Atualizar a venda
    sale.productName = productName;
    sale.amount = amount;
    sale.price = price;
    await sale.save();

    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Busque todas as vendas relacionadas ao produto
    const sales = await Sale.find({ productId: productId });

    // Para cada venda encontrada, delete-a e atualize o inventário
    for (let sale of sales) {
      const inventoryItem = await Inventory.findOne({ name: sale.productName.toLowerCase() });
      if (inventoryItem) {
        // Repor a quantidade de estoque
        inventoryItem.quantity += sale.amount;
        await inventoryItem.save();
      }
      await Sale.findByIdAndDelete(sale._id);
    }

    res.status(204).send(); // Resposta sem conteúdo se a exclusão for bem-sucedida
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
};


exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  SalesModel.findByIdAndDelete(productId)
    .then(() => {
      res.status(204).send(); // Resposta sem conteúdo se a exclusão for bem-sucedida
    })
    .catch(error => {
      console.error('Erro ao deletar produto:', error);
      res.status(500).send('Erro ao deletar produto');
    });
};



