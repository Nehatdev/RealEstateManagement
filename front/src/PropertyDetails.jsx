import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css'; 

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/details/${id}`);
                console.log(response.data);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleBookNow = async () => {
        navigate(`/customerpage/propertydetails/booking/${id}`);
    };

    return (
        <section className="property-details-container">
            <div className='details'>
                <h1 className="property-title">{property.title}</h1>
                <div className="property-image-container">
                    <img 
                        src={`http://localhost:4000/uploads/${property.image}`} 
                        alt={property.title} 
                        className="property-image"
                    />
                </div>
                <p className="property-description">{property.description}</p>
                {property.status === 'rented' ? (
                        <p>Status: Booked</p>
                    ) : (

                <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
            )}

            </div>
        </section>
    );
};

export default PropertyDetails;
