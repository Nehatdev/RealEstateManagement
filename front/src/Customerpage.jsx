import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import './App.css'
import logo from './bgimg.jpg';


export const Customerpage = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    
    <div>
       <div className='nav'>
         <div className='bgimg'>
           <img src={logo} style={{ width: '50px' }} alt="bg" />
         </div>
         <div className='head'>
           <h1> ShelterHub </h1>
         </div>
         <div className='list'>
           <Link to='/customerpage/home'>Home</Link>
           <Link to='/customerpage/customerpropertyview'>Properties</Link>
           {/* <Link to='/customerpage/propertydetails'>Pro</Link> */}
           {/* <Link to='/customerpage/contact'>Contacts</Link> */}
           <Link to='/customerpage/customerprofile'>Profile</Link>
           <Link to='/'><button className='blogbtn' onClick={handleClick}>Logout</button></Link>
         </div>
       </div>
       <Outlet/>
     </div>


   );
 };

