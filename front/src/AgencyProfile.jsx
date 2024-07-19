import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { baseUrl } from './Urls';

export const AgencyProfile = () => {
    const [agent, setAgencyData] = useState({
        username: '',
        email: '',
        phone_no: '',
        country: '',
        status: ''
    });

    const id = localStorage.getItem('id');
    useEffect(() => {
        const fetchAgencyData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/agencyprofile/${id}`);
                setAgencyData(response.data);
            } catch (error) {
                console.error('Error fetching agency data:', error);
            }
        };

        fetchAgencyData();
    }, [id]);

    const handleChange = (event) => {
        setAgencyData({ ...agent, [event.target.name]: event.target.value });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}/updateagencyprofile/${id}`, agent);
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
                    <p><strong>UserName:</strong> {agent.username}</p>
                    <p><strong>Email:</strong> {agent.email}</p>
                    <p><strong>Phone_No:</strong> {agent.phone_no}</p>
                    <p><strong>Country:</strong> {agent.country}</p>
                    <p><strong>Status:</strong> {agent.status ? 'Approved' : 'Not Approved'}</p>
                </div>
            </div>
            <div className="update-box">
                <h2>Update Profile</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>User Name:</label>
                        <input type="text" name="UserName" value={agent.username} onChange={handleChange} placeholder="Enter the name" required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={agent.email} onChange={handleChange} placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                        <label>Phone_No:</label>
                        <input type="text" name="phone-no" value={agent.phone_no} onChange={handleChange} placeholder="Enter the number" required />
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <input type="text" name="country" value={agent.country} onChange={handleChange} placeholder="Enter the country" required />
                    </div>
                    <button type="submit" className='profilebtn'>Update Profile</button>
                </form>
            </div>
        </div>
    )
};
