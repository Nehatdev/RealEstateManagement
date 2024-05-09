import { Link } from 'react-router-dom'
import './App.css'
import logo from './bgimg.jpg';

const AdminNav = () => {
  return (
   <div>
      <div className='nav'>
        <div className='bgimg'>
          <img src={logo} style={{ width: '50px' }} alt="bg" />
        </div>
        <div className='head'>
          <h1>Real Estate Management</h1>
        </div>
        <div className='list'>
          <Link to='/Propertyhandle'>PropertyHandle</Link>
          <Link to='/Customer'>Customer</Link>
          <Link to='/Agency'>Agency</Link>
          <Link to='/'></Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
