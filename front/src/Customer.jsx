import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

export const Customer = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Fetch all users
        axios.get('http://localhost:4000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);
    return (
        <div>
            <div className="admin-page-container">
                <div className="section">
                    <h2>User Details</h2>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>Phone_No</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.country}</td>
                                    <td>{user.phone_no}</td>
                                    <td>{user.roles}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
