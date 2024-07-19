import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { baseUrl } from './Urls';

const HomePropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/details/${id}`);
                console.log(response.data);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };
        fetchData();
    }, [id]);

    console.log('Property:', property);



    return (
        <section className="property-details-container">
            <div className="details container">
                <h1>{property.title}</h1>
                <div className="property-image-container">
                    <img src={`${baseUrl}/uploads/${property.image}`} alt="" />
                </div>
                <div className="content">{property.description}</div>

            </div>
        </section>
    );
};

export default HomePropertyDetails;
