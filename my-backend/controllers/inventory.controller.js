const mongoose = require('mongoose');
const Inventory = require('../models/inventory.model');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  const newItem = new Inventory(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
