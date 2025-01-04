import React from 'react';
import CarteIcon from './cart';
import Profile from './profile';
import logo from './Row.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
 const navigate = useNavigate(); 

  return (

    <div className='flex justify-between w-full items-center pt-4 pb-4 font-poppins'>
      <div className='w-1/3 flex justify-center items-center'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='justify-center items-center'>
        <nav>
          <ul className='flex space-x-5'>
            <li className='text-[16px]'><a href="/">Home</a></li>
            <li className='text-[16px]'><a href="/services" onClick={()=>navigate("/services")}>Services</a></li>
            <li className='text-[16px]' onClick={()=>navigate("/about")}><a href="/about">About Us</a></li>
            <li className='text-[16px]' onClick={()=>navigate("/contactus")}><a href="/contactus" >Contact Us</a></li>
          </ul>
        </nav>
      </div>
      <div className='w-1/3 flex justify-center items-center space-x-4'>
        <CarteIcon />
        <Profile />
        <button  /*  onClick={() => navigate("/Signup")} */  className='w-[111px] h-[44px] bg-buttonColor text-white rounded'>Book Now</button>
      </div>
    </div>
  );
}

export default Navbar;
