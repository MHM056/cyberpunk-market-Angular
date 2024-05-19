const Item = require('../models/Item');

exports.getAll = () => Item.find();

exports.getOne = (itemId) => Item.findById(itemId);

exports.create = (itemData) => Item.create(itemData);

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);