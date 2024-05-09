import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export const CustomerProfile = () => {
    const [customer, setCustomerData] = useState({
        username: '',
        email: '',
        phone_no: '',
        country: '',
      
    });

    const id = localStorage.getItem('id');
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/customerprofile/${id}`);
                setCustomerData(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomerData();
    }, [id]);

    const handleChange = (event) => {
        setCustomerData({ ...customer, [event.target.name]: event.target.value });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/updatecustomerprofile/${id}`, customer);
            if (response.data) {
                localStorage.setItem('response', JSON.stringify(response.data));
                window.alert('Profile Updated Successfully');
            } else {
                window.alert('Failed to update');
            }
        } catch (error) {
            console.log('Error updating profile', error);
            window.alert('Failed to Update profile');
        }
    };

    return (

        <div className="agency-profile-container">
            <div className="profile-box">
                <h2 className='ProfileHead'>Your Profile</h2>
                <div className="profile-details">
                    <p><strong>UserName:</strong> {customer.username}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone_No:</strong> {customer.phone_no}</p>
                    <p><strong>Country:</strong> {customer.country}</p>
                
                </div>
            </div>
            <div className="update-box">
                <h2>Update Profile</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>User Name:</label>
                        <input type="text" name="UserName" value={customer.username} onChange={handleChange} placeholder="Enter the name" required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label>Phone_No:</label>
                        <input type="text" name="phone-no" value={customer.phone_no} onChange={handleChange} placeholder="Enter the number" required />
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <input type="text" name="country" value={customer.country} onChange={handleChange} placeholder="Enter the country" required />
                    </div>
                    <button type="submit" className='profilebtn'>Update Profile</button>
                </form>
            </div>
        </div>
    )
};

