const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    phone_no: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    
    roles: {
        type: String,
        enum: ['customer','agent'], 
        required: true
    },
    status: {
        type: Boolean,
        
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
