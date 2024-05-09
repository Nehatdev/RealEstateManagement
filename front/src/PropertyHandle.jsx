import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './App.css'; 


  export const PropertyHandle = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    try {
      let response = await axios.get('http://localhost:4000/properties');
      console.log(response.data);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  return (
    <section style={{ marginTop: '150px' }} className='d-flex justify-content-center'>
      <div className='properties'>
        {properties.length > 0 ? (
          properties.map(item => (
            <div key={item._id} className='card-container'>
              <Card className='card' onClick={() => { navigate(`/adminpage/Propertydeletehandle/${item._id}`) }}>
                <Card.Img variant="top" src={`http://localhost:4000/uploads/${item.image}`} alt="property" width={'200px'} height={'200px'} />
                <Card.Body className="property-details">
                  <Card.Title className='card-title'>
                    <h2>{item.title}</h2>
                  </Card.Title>
                  <Card.Text className='card-content'>
                    <div>{item.description}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>No Properties Found</div>
        )}
      </div>
    </section>
  );
}

