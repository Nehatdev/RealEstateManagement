import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './Nav';
import reportWebVitals from './reportWebVitals';
import { Home } from './Home';
import Login from './Login';
import Register from './Register';
import { Provider } from 'react-redux';
import { Store } from './Store';
import { Property } from './Property';
import AboutUs from './AboutUs';
import Adminpage from './Adminpage';
import { Customerpage } from './Customerpage';
import Agencypage from './Agencypage';
import { Customer } from './Customer';
import { Agency } from './Agency';
import { PropertyHandle } from './PropertyHandle';
import { AgencyProfile } from './AgencyProfile';
import { Contact } from './Contact';
import { CustomerProfile } from './CustomerProfile';
import { PropertyView } from './PropertyView';
import PropertyDetails from './PropertyDetails';
import Booking from './Booking';
import HomePropertyDetails from './HomePropertyDetails';
import { CustomerPropertyView } from './CustomerPropertyView';
import Bookingdetails from './BookingDetails'
import { PropertyDeleteHandle } from './PropertyDeleteHandle'
import { AgencyHandle } from './AgencyHandle';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Nav />}>
            <Route index element={<Home />} />
            <Route path='Reg' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<AboutUs />} />
            <Route path='propertyview' element={<PropertyView />} />
            <Route path='homepropertydetails/:id' element={<HomePropertyDetails />} />
          </Route>
          <Route path='/adminpage' element={<Adminpage />}>
            <Route index element={<Home />} />
            <Route path='PropertyHandle' element={<PropertyHandle />} />
            <Route path='PropertyDeleteHandle/:id' element={<PropertyDeleteHandle />} />
            <Route path='Customer' element={<Customer />} />
            <Route path='Agency' element={<Agency />} />
          </Route>
          <Route path='/customerpage' element={<Customerpage />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='customerpropertyview' element={<CustomerPropertyView />} />
            <Route path='propertydetails/:id' element={<PropertyDetails />} />
            <Route path='propertydetails/booking/:id' element={<Booking />} />
            <Route path='customerprofile' element={<CustomerProfile />} />
            <Route path='contact' element={<Contact />} />
          </Route>
          <Route path='/agencypage' element={<Agencypage />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='property' element={<Property />} />
            <Route path='agencyprofile' element={<AgencyProfile />} />
            <Route path='propertyview' element={<PropertyView />} />
            <Route path='bookingdetails' element={<Bookingdetails />} />
            <Route path='agencyhandle/:id' element={<AgencyHandle />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
