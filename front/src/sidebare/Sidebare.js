import React, { useState,useEffect } from 'react';
import Profil from '../profile/Profile';
import Appoiment from './Appoiment';
import Navbar from '../homepage/navbar';
import Header from '../homepage/header';
import img from '../comp/A.png'
import im from '../comp/B.png'
import { Navigate,useNavigate } from 'react-router-dom';
import {useStylists} from '../StylistProvider'
import Cart from '../cart_payement/cat';
import PaymentDetails from '../cart_payement/payementForm';
const Sidebar = () => {
      const {setFirstletr} = useStylists();
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
  const [profileData, setProfileData] = useState({
      name: "",
      email: "",
      phone_number: "",
    });
    const [newPassword, setNewPassword] = useState("");
    const API_BASE_URL = "http://127.0.0.1:8000/profile";
  
    // Fetch profile data from the backend
    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem("token"); 
     
  
        if (!token) {
          console.error("User is not logged in.");
          return;
        }
  
        try {
          const response = await fetch(API_BASE_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Pass token in Authorization header
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setProfileData(data);
            if (data.name && data.name.length > 0) {
              const firstLetter = data.name.charAt(0).toUpperCase();
              setFirstletr(firstLetter);
              localStorage.setItem("firstletter", firstLetter); // Save in localStorage
            }
            
          } else {
            console.error("Failed to fetch profile data:", await response.text());
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      fetchProfile();
    }, []);
    setFirstletr(profileData.name)

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
          {What === 'Cart' && <Cart />}
          {What === 'PaymentDetails' && <PaymentDetails/>}

          <img className="absolute right-0 bottom-0" src={im} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

