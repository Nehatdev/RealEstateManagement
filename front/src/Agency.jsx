import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export const Agency = () => {
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const fetchAgency = async () => {
            try {
                const response = await axios.get('http://localhost:4000/agent');
                setAgencies(response.data);
            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        };

        fetchAgency(); // Call the fetchAgency function inside useEffect
    }, []); // Empty dependency array means this effect runs only once on component mount

    const verifyAgency = async (agentId,status) => {
        try {
            const response = await axios.put(`http://localhost:4000/agencyverification/${agentId}`,{status});
            console.log('Response:', response);

            // Update the agencies state to mark the agent as verified
            setAgencies(agencies.map(agent => (agent._id === agentId ? { ...agent, verified: true } : agent)));
        } catch (error) {
            console.error('Error verifying agency:', error);
        }
    };

    return (
        <div>
            <div className="section">
                <h2>Agency Details</h2>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Phone_No</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencies.map(agent => (
                            <tr key={agent._id}>
                                <td>{agent.username}</td>
                                <td>{agent.email}</td>
                                <td>{agent.country}</td>
                                <td>{agent.phone_no}</td>
                                <td>{agent.roles}</td>
                                <td>{agent.status ? 'Verified' : 'Not Verified'}</td>
                                <td>
                                    {agent.status ? 'verified' : (
                                        <button className="bg" style={{ color: 'black',backgroundColor: 'green' }} onClick={() => verifyAgency(agent._id,true)}>
                                            Verify
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Agency;
