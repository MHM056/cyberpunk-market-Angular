const Item = require('../models/Item');

exports.getAll = () => Item.find();

exports.getOne = (itemId) => Item.findById(itemId);

exports.create = async (itemData) => {
    const itemFound = await Item.find({
        item: itemData.item,
        price: itemData.price,
        availability: itemData.availability,
        type: itemData.type,
        description: itemData.description
    });

    if (itemFound.length > 0) {
        throw new Error('Duplicate item!');
    }

    return Item.create(itemData);
}

exports.delete = (itemId) => Item.findByIdAndDelete(itemId);
