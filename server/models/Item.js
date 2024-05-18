const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Item name is required!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        validate: {
            // TODO => URL validator
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']
    },
    availability: {
        type: String,
        required: [true, 'Availability is required!']
    },
    type: {
        type: String,
        required: [true, 'Type is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;