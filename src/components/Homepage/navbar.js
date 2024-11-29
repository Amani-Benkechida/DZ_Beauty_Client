import React from 'react';
import CarteIcon from '../icons/cart';
import Profile from '../icons/profile';
import logo from './Row.png';
import '../../index.css'

const Navbar = () => {
  return (
    <div className='flex justify-between w-full items-center pt-4 pb-4 font-poppins'>
      <div className='w-1/3 flex justify-center items-center'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='justify-center items-center'>
        <nav>
          <ul className='flex space-x-5'>
            <li className='text-[16px]'><a href="/">Home</a></li>
            <li className='text-[16px]'><a href="/services">Services</a></li>
            <li className='text-[16px]'><a href="/about">About Us</a></li>
            <li className='text-[16px]'><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </div>
      <div className='w-1/3 flex justify-center items-center space-x-4'>
        <CarteIcon />
        <Profile />
        <button className='w-[111px] h-[44px] bg-buttonColor text-white rounded'>Book Now</button>
      </div>
    </div>
  );
}

export default Navbar;
