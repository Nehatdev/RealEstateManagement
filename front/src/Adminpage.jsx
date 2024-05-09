import { Link, Outlet,useNavigate } from 'react-router-dom'
import './App.css'
import logo from './bgimg.jpg';

const Adminpage = () => {
  
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
          <h1>Real Estate Management</h1>
        </div>
        <div className='list'>
          <Link to='/adminpage/Propertyhandle'>PropertyHandle</Link>
          <Link to='/adminpage/Customer'>Customer</Link>
          <Link to='/adminpage/Agency'>Agency</Link>
          <Link to='/'><button className='blogbtn' onClick={handleClick}>Logout</button></Link>
        </div>
      </div>

      
       
      <Outlet/>
    </div>
  );
};

export default Adminpage;
