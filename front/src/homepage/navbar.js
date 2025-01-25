import React, { useState, useEffect } from 'react';
import CarteIcon from './cart';
import Profile from './profile';
import logo from './Row.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const [cartCount, setCartCount] = useState();
  const navigate = useNavigate();

  return (
    <div className='flex justify-between w-full items-center pt-4 pb-4 font-poppins'>
      <div className='w-1/3 flex justify-center items-center'>
        <img src={logo} alt="Logo" />
      </div>
      <div className='justify-center items-center'>
        <nav>
          <ul className='flex space-x-5'>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]'>
              <a href="/">{t('navigation.home')}</a> {/* Translated "Home" */}
            </li>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]' onClick={() => navigate("/services")}>
              {t('navigation.services')} {/* Translated "Services" */}
            </li>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]' onClick={() => navigate("/about")}>
              {t('navigation.aboutUs')} {/* Translated "About Us" */}
            </li>
            <li className='text-[16px] hover:underline hover:decoration-[#323232] hover:decoration-[2px]' onClick={() => navigate("/contactus")}>
              {t('navigation.contactUs')} {/* Translated "Contact Us" */}
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
        <div className='w-1/5 h-1/5 flex items-center justify-center cursor-pointer'>
          <Profile />
        </div>
        
        <button className='w-[111px] h-[44px] bg-buttonColor text-white rounded hover:bg-button_hover'
          onClick={() => navigate("/booknow")}
        >
          {t('navigation.bookNow')} {/* Translated "Book Now" */}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
