import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import bimg from './bimg.jpg';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState('');

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/insert', data);
      window.alert('Registration successful');
      setData('');
      navigate('/login');
    } catch (error) {
      window.alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="home_container" style={{ backgroundImage: `url(${bimg})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%',padding: '45px'}}>
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="register-title">Register</h1>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone_no"
              placeholder="Phone Number"
              value={data.phone_no}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={data.country}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="form-group">
            <select
              name="roles"
              onChange={handleChange}
              className="select-field mt-3 mb-3"
              value={data.usertype}
              required
            >
              <option value="">-Select-</option>
              <option value="customer">User</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <NavLink to="/login" className="login-link">
            Already registered? Login
          </NavLink>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
