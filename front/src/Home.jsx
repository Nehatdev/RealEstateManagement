import React from 'react'
import hbgimg from './img1.jpg'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <div className='home_container' style={{ backgroundImage: `url(${hbgimg})` }}>
        <div className='content'>
          <Link to ='login' ><button type="" className='fbtn'>Login</button></Link>
          <h1 className='main'>DISCOVER A PLACE YOU LOVE TO LIVE</h1>
          <h2 className='sub'>Easy Way To Find A Perfect Property</h2>
        </div>
      </div>

    </div>
  )
}
