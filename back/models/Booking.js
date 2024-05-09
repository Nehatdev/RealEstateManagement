const mongoose = require('mongoose');
const Property= require('./property');
const Customer= require('./customer')



const bookingSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Property,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:Customer
    },
   
    checkinDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    age: {
        type: Number
    },
    marriageStatus:{
        type: String
    },
    adharNumber:{
        type: Number
    },
    state:{
        type: String
    },
    address:{
        type: String
    },
    // user: String,
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
