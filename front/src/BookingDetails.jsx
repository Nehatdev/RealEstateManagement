import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

const BookingDetails = () => {
    const [bookings, setBookings] = useState([]);
    const agencyId = localStorage.getItem('id');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/bookings/agent/${agencyId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [agencyId]);

    return (
        <div className="container">
            <h2 className="heading">Booked Properties</h2>
            {bookings.length === 0 ? (
                <p>No properties have been booked.</p>
            ) : (
                bookings.map((item) => (
                    <div key={item.booking._id} className="property-item">
                        <p><strong>Full Name:</strong> {item.customer.username}</p>
                        <p><strong>Property Title:</strong> {item.property.title}</p>
                        <p><strong>Email:</strong> {item.customer.email}</p>
                        <p><strong>Phone:</strong> {item.customer.phone_no}</p>
                        <p><strong>Place:</strong> {item.property.location}</p>
                        <p><strong>Check-in Date:</strong> {item.booking.checkinDate}</p>
                        <p><strong>Check-out Date:</strong> {item.booking.checkoutDate}</p>
                        <p><strong>Guests:</strong> {item.booking.guests}</p>
                        <p><strong>Price:</strong> {item.property.price}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookingDetails;
