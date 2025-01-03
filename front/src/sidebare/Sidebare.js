import React, { useState } from 'react';
import Profil from '../profile/Profile';
import Appoiment from './Appoiment';
import Navbar from '../homepage/navbar';
import Header from '../homepage/header';
import img from '../comp/A.png'
import im from '../comp/B.png'
import { Navigate,useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate=useNavigate();
  const [activeSection, setActiveSection] = useState('Appointments');

  const sections = [
    { name: 'Appointments', label: 'Appointments' },
    { name: 'Cart', label: 'Cart' },
    { name: 'PaymentDetails', label: 'Payment details' },
    { name: 'MesInformations', label: 'Mes informations' },
    { name: 'Support', label: 'Support' },
    { name: 'Deconnexion', label: 'Deconnexion' },
  ];
  const [What, setWhat] = useState("");

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    if (sectionName === 'Deconnexion') {
      // Remove token from localStorage
      localStorage.removeItem('token');
      alert('You have logged out.');
      navigate("/login")

      // Redirect the user to the login page or homepage
      window.location.href = '/login'; // Update the path as needed
    }
  };

  return (
    <div className="relative">
      <Header />
      <Navbar />
      <img className="absolute" src={img} />

      <div className="flex ml-20 mr-20 shadow-2xl mb-3 shadow-gray-400 h-auto">
        <div className="font-poppins h-screen p-4 w-1/4">
          <div className="text-lg font-bold mb-6"></div>
          <ul className="space-y-4">
            {sections.map((section) => (
              <li
                key={section.name}
                onClick={() => {
                  handleSectionClick(section.name);
                  setWhat(section.name);
                }}
                className={`cursor-pointer p-2 rounded-lg ${
                  activeSection === section.name
                    ? 'bg-[#EDDADA] text-buttonColor'
                    : 'bg-transparent text-darkgray'
                }`}
              >
                {section.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 mt-10 ml-10 relative">
          {What === 'MesInformations' && <Profil />}
          {What === 'Appointments' && <Appoiment />}
          <img className="absolute right-0 bottom-0" src={im} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

