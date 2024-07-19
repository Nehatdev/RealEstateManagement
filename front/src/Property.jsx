import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { baseUrl } from './Urls';

export const Property = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',

  });
  const [image, setImage] = useState('');

  const handleChange = (event) => {
    setPropertyData({ ...propertyData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0] );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    try {
        const userId = localStorage.getItem('id');
      console.log(userId);
      const postData = {
        ...propertyData,
        user: userId,
        status: 'available'
      };
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('description', postData.description);
      formData.append('price', postData.price);
      formData.append('location', postData.location);
      formData.append('image',image);
      formData.append('user', localStorage.getItem('id'));
      formData.append('status', postData.status);

      const response = await axios.post(`${baseUrl}/addproperty`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data) {
        window.alert('Property added successfully');
        setPropertyData({
          title: '',
          description: '',
          price: '',
          location: '',
          
        });
        setImage('');
      }
    } catch (error) {
      console.error('Error adding property:', error);
      window.alert('Failed to add property');
    }
  };

  return (
    <div className="create-container">
      <h1 className="login-title">Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="cinput-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={propertyData.title}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Description:</label>
          <textarea
            name="description"
            rows={6}
            value={propertyData.description}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={propertyData.price}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={propertyData.location}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <button className="cbutton" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};



