const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: [true, 'Item name is required!'],
        minLength: [3, 'Item name should be at least 3 characters long!'],
        maxLength: [30, 'Item name should be no longer than 30 characters!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        match: [/^http?s:\/\//, 'Invalid URL']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: function (v) {
                return v >= 0;
            },
            message: 'Price must be a positive number!'
        }
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
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be atleast 10 characters long'],
        maxLength: [200, 'Description should be no longer than 200 characters']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: created_at } });

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;