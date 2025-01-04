import React, { useState, useEffect } from 'react';
import CarteIcon from './cart';
import Profile from './profile';
import logo from './Row.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch cart count from backend
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('/api/cart'); // Replace with your API endpoint
        setCartCount(response.data.length); // Assuming response.data is the cart array
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);
  const handleProfileClick = () => {
    // Vérifie si le token existe dans localStorage
    const token = localStorage.getItem('token'); 
    
    if (!token) {
      // Si le token n'existe pas, redirige vers la page de login
      navigate('/login');
    } else {
      // Si le token existe, fais ce que tu veux (par exemple afficher le profil)
      console.log('Accès au profil');
    }
  };
  return (
    <div className='flex justify-between w-full items-center pt-4 pb-4 font-poppins'>
      <div className='w-1/3 flex justify-center items-center'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='justify-center items-center'>
        <nav>
          <ul className='flex space-x-5'>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]'>
              <a href="/">Home</a>
            </li>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]' onClick={() => navigate("/services")}>
              Services
            </li>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]' onClick={() => navigate("/about")}>
              About Us
            </li>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]' onClick={() => navigate("/contactus")}>
              Contact Us
            </li>
          </ul>
        </nav>
      </div>
      <div className='w-1/3 flex justify-center items-center space-x-4'>
        <div className="relative">
          <CarteIcon />
          {/* Notification Badge */}
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              {cartCount}
            </span>
          )}
        </div>
        <div onClick={handleProfileClick} className='w-1/5 h-1/5 flex items-center justify-center cursor-pointer'>
        <Profile />
      
    </div>
        
        <button className='w-[111px] h-[44px] bg-buttonColor text-white rounded hover:bg-button_hover'>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Navbar;
