import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import './App.css'
import logo from './bgimg.jpg';


function Agencypage() {
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
           <Link to='/agencypage/home'>Home</Link>
           <Link to='/agencypage/propertyview'>property</Link>
           <Link to='/agencypage/property'>Add Properties</Link>
           <Link to='/agencypage/bookingdetails'>Booked Properties</Link>
           <Link to='/agencypage/agencyprofile'>Profile</Link>
           <Link to='/'><button className='blogbtn' onClick={handleClick}>Logout</button></Link>
         </div>
       </div>

       <Outlet/>
     </div>

    
   );
 };

export default Agencypage