import React from 'react';
import Pres from './Pres';
import image1 from './A.png'
import image2 from './B.png'
import data from '../info.json';
import axios from 'axios';
import  { useState, useEffect } from "react";

 import {useStylists} from '../StylistProvider'
 const PRESES = () => {
  const {idservice} = useStylists();
  console.log(idservice)
  const firstStylist = data.stylists[0];
  const secondStylist= data.stylists[1];
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  


  


  const fetchPrestatairesByService = async (serviceId) => {
    try {
      const response = await axios.get("http://localhost:8000/prestataire", {
        params: { service_id:idservice}
      });
      console.log("Prestataires:", response.data.prestataires);
      console.log(serviceId)
      setServices(response.data.prestataires); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching prestataires:", error.response?.data || error.message);
      setError("Failed to fetch prestataires.");
    }
  };


  useEffect(() => {
    if (idservice) {
      fetchPrestatairesByService(idservice);

    }

  }, [idservice]); // Dependency array ensures this runs when idservice changes

  

  



   
  async function getUser(userId) {
    try {
      const response = await axios.get(`http://localhost:8000/${userId}`);
      
      console.log('User data:', response.data);
      
      // Use data as needed
      alert(`User Name: ${response.data.name}`);
      alert(`Email: ${response.data.email}`);
      alert(`Role: ${response.data.role}`);
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('Failed to fetch user data');
    }
  }






  // Call the function with the user ID you want to fetch
 // Replace 1 with the actual user ID

 
    
  

  return (
    
  


    
          
     <div className='pt-0 p-24'>
           
      <div className='text-darkgray' style={{ fontSize: '45px', fontWeight: '100',fontColor:'#323232' }}>
        Choose From The Best
        <br/>
      </div>
      <div className=' grid grid-cols-4 gap-4  p-6  '>
      {data.stylists.map((stylist, index) => (
        <Pres
          key={index}
          id={stylist.id}
          image={stylist.image} // Ensure a unique key for React rendering
          name={stylist.name}
          profision={stylist.profession}
          exprience={stylist.expertiseLevel}
          price={stylist.price}
        />
      ))}
        
      </div>
    
      </div>
     


  
  );
};

export default PRESES;
