const mongoose = require('mongoose');
const Customer= require('./customer')
const propertySchema = new mongoose.Schema({
    title:
    {
        type: String, required: true
    },
    description:
    {
        type: String, required: true
    },
    price:
    {
        type: Number, required: true
    },
    location:
    {
        type: String, required: true
    },
    image:
    {
        type: String,
        required: true

    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:Customer
    },
    status:{
        type: String,
        enum: ['available', 'rented'],
        default: 'available'
        
    },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
