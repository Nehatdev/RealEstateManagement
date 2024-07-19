import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { baseUrl } from './Urls';

export const PropertyDeleteHandle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const [user, setAgency] = useState({});

    const fetchData = async () => {
        try {
            const propertyResponse = await axios.get(`${baseUrl}/details/${id}`);
            setProperty(propertyResponse.data);
            const agencyResponse = await axios.get(`${baseUrl}/agencyprofile/${propertyResponse.data.user}`);
            setAgency(agencyResponse.data);
        } catch (error) {
            console.error('Error fetching property or agency:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${baseUrl}/details/${id}`);
            navigate('/adminpage/propertyhandle');
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <section className="property-details-container">
            <div className="details container">
                <h1>{property.title}</h1>
                <img src={`${baseUrl}/uploads/${property.image}`} alt="" />
                <div className="content">{property.description}</div>
                <div className="agency-details">
                    <h3>Agency Details</h3>
                    <p>Name: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </section>
    );
};
