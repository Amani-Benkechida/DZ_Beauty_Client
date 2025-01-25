import React, { useState, useEffect } from 'react';
import Profil from '../profile/Profile';
import Appoiment from './Appoiment';
import Navbar from '../homepage/navbar';
import Header from '../homepage/header';
import img from '../comp/A.png';
import im from '../comp/B.png';
import { useNavigate } from 'react-router-dom';
import { useStylists } from '../StylistProvider';
import Cart from '../cart_payement/cat';
import PaymentDetails from '../cart_payement/payementForm';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Sidebar = () => {
  const { setFirstletr } = useStylists();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Access translations
  const [activeSection, setActiveSection] = useState(t('Appointments'));

  const sections = [
    { name: 'Appointments', label: t('Appointments') },
    { name: 'Cart', label: t('Cart') },
    { name: 'PaymentDetails', label: t('PaymentDetails') },
    { name: 'MesInformations', label: t('MesInformations') },
    { name: 'Support', label: t('Support') },
    { name: 'Deconnexion', label: t('Deconnexion') }
  ];
  const [What, setWhat] = useState("");

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    if (sectionName === 'Deconnexion') {
      localStorage.removeItem('token');
      alert(t('LogoutMessage'));
      navigate("/login");
      window.location.href = '/login'; // Update path if needed
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFirstletr(data.name?.charAt(0).toUpperCase() || '');
        } else {
          console.error("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [setFirstletr]);

  return (
    <div className="relative">
      <Header />
      <Navbar />
      <img className="absolute" src={img} alt="" />

      <div className="flex ml-20 mr-20 shadow-2xl mb-3 shadow-gray-400 h-auto">
        <div className="font-poppins h-screen p-4 w-1/4">
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
          {What === 'Cart' && <Cart />}
          {What === 'PaymentDetails' && <PaymentDetails />}
          <img className="absolute right-0 bottom-0" src={im} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
