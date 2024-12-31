import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import Addprestataire from './Addprestataire';
import Headadmin from './Headadmin';

const Sidebaradmin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] =  useState('Appointments');

  const sections = [
    { name: 'Appointments', label: 'Appointments' },
    { name: 'Prestataires List', label: 'Prestataires List' },
    { name: 'Log Out', label: 'Log Out' },
    { name: 'Help Center', label: 'Help Center' },
  ];

  const [What, setWhat] =  useState("");

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    if (sectionName === 'Log Out') {
      // Remove token from localStorage
      localStorage.removeItem('token');
      alert('You have logged out.');
      navigate('/login');
    }
  };

  return (
    <div className=''>
      
      <div className="fix rounded-md">
        <div className="flex  shadow-2xl mb-3 shadow-gray-400 h-auto rounded-md">
          <div className="font-poppins h-screen p-4 w-1/5 bg-[#CB8587] rounded-md m-4">
            <div className="text-lg font-bold mb-6 rounded-md"></div>
            <ul className="space-y-4 rounded-md">
              {sections.map((section, index) => (
                <li
                  key={section.name}
                  onClick={() => {
                    handleSectionClick(section.name);
                    setWhat(section.name);
                  }}
                  className={`cursor-pointer p-2 rounded-lg ${
                    activeSection === section.name
                      ? 'bg-[#EDDADA] text-buttonColor'
                      : 'bg-transparent text-white'
                  } ${section.name === 'Log Out' ? 'absolute bottom-16' : ''}
                  ${section.name === 'Help Center' ? 'absolute bottom-6' : ''}`

                } 
                  // Add margin-top for "Log Out"
                >
                  {section.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-4/5  relative">
          <Headadmin/>

          {What === 'Prestataires List' &&<Addprestataire/>}
          
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebaradmin;
