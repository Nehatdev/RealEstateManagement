import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css'
import bimg from './bimg.jpg'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (data.email === 'admin@gmail.com' && data.password === 'admin') {

        const adminData = {
          _id: 'adminId',
          email: 'admin@gmail.com',
          roles: 'admin'
        };
        localStorage.setItem('id', adminData._id);
        localStorage.setItem('userType', adminData.roles);
        navigate('/adminpage');
        window.alert('Admin login successful!');
      } else {
        let response = await axios.post('http://localhost:4000/login', data);

        if (response.data.status) {
          const { _id: id, roles } = response.data.data;
          localStorage.setItem('id', id);
          localStorage.setItem('userType', roles);

          if (response.data.data.roles === 'agent' && response.data.data.status) {
            navigate('/agencypage');
            window.alert('Agency login successful!');
          } else if (roles === 'customer') {
            navigate('/customerpage');
            window.alert('Customer login successful!');
          }
        } else {
          window.alert('Invalid email or password. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      window.alert('Login Failed. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="home_container" style={{ backgroundImage: `url(${bimg})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', padding: '45px' }}>
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <NavLink to="/Reg" className='login-link'>Not yet registered? Register Now</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
