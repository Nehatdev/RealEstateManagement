import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './App.css';

 export const PropertyView = () => {
  const [agencyProperties, setAgencyProperties] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchAgencyProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/properties`);
        setAgencyProperties(response.data);
      } catch (error) {
        console.error('Error fetching agency properties:', error);
      }
    };

    fetchAgencyProperties();
  }, [id]);

  return (
    <div className="agency-properties-container">
      
      {agencyProperties.map(property => (
        <Card key={property._id} onClick={() => navigate(`/customerpage/propertydetails/${property._id}`)} className="property-card">
          <Card.Body>
            <Card.Img variant="top" src={`http://localhost:4000/uploads/${property.image}`} alt="property" width={'200px'} height={'200px'} />
            <Card.Title>{property.title}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};


