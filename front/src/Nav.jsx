import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import logo from './bgimg.jpg';

export const Nav = () => {
    const navigate = useNavigate()
    const user = localStorage.getItem('id')

    const handleClick = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <div>
                <div className='nav'>
                    <div className='bgimg'>
                        <img src={logo} style={{ width: '50px' }} alt="bg" />
                    </div>
                    <div className='head'>
                        <h1> ShelterHub </h1>
                    </div>


                    <div className='list'>
                        <Link to='/'>Home</Link>
                        <Link to='propertyview'>Property</Link>
                        <Link to='about'>About us</Link>
                         <Link to='/Reg'>Register</Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}









