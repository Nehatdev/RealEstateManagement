import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export const Booking = () => {
    const { id } = useParams();
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    const [propertyDetails, setPropertyDetails] = useState({
        title: '',
        location: '',
        price: 0
    });

    const [formData, setFormData] = useState({
        checkinDate: '',
        checkoutDate: '',
        guests: 1,
        age: '',
        marriageStatus: '',
        adharNumber: '',
        address: '',
        state: '' ,
        
    }); 

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/details/${id}`);
                setPropertyDetails(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };
        fetchPropertyDetails();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/bookings', {
                propertyId: id,
                propertyTitle: propertyDetails.title,
                checkinDate: formData.checkinDate,
                checkoutDate: formData.checkoutDate,
                guests: formData.guests,
                age: formData.age,
                marriageStatus: formData.marriageStatus,
                adharNumber: formData.adharNumber,
                address: formData.address,
                state: formData.state,
                user: userId
            });

            console.log('Booking successful:', response.data);
            window.alert('Booking successful!');
            navigate('/customerpage/customerpropertyview');
        } catch (error) {
            console.error('Error booking property:', error);
            window.alert('Booking failed. Please try again.');
        }
    };

    return (
        <div className="booking-form-container">
            <h1>Booking Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Property Title</label>
                    <input type="text" id="title" name="title" value={propertyDetails.title} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" name="location" value={propertyDetails.location} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input type="number" id="price" name="price" value={propertyDetails.price} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="checkin">Check-in Date</label>
                    <input type="date" id="checkin" name="checkinDate" value={formData.checkinDate} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="checkout">Check-out Date</label>
                    <input type="date" id="checkout" name="checkoutDate" value={formData.checkoutDate} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" id="age" name="age" value={formData.age} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="marriageStatus">Marriage Status</label>
                    <select id="marriageStatus" name="marriageStatus" value={formData.marriageStatus} onChange={handleFormChange} required>
                        <option value="">Select</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="adharNumber">Aadhar Number</label>
                    <input type="text" id="adharNumber" name="adharNumber" value={formData.adharNumber} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea id="address" name="address" value={formData.address} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" name="state" value={formData.state} onChange={handleFormChange} required />
                </div>
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default Booking;
