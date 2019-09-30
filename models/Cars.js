const mongoose = require('mongoose');
const date = require('date-and-time');

const CarsSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: date.now
    }
});

module.exports = mongoose.model('Cars', CarsSchema);
