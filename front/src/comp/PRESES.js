import React from 'react';
import Pres from './Pres';
import image1 from './A.png'
import image2 from './B.png'
import data from '../info.json';
import { useEffect, useState } from'react';

const PRESES = () => {
  const firstStylist = data.stylists[0];
  const secondStylist= data.stylists[1];
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/prestataire?service_id=1'); // Replace with your actual service ID logic
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
        console.log("hello")
      }
      const data = await response.json();
      setServices(data.prestataires); // Assuming backend returns the IDs or relevant data
      setLoading(false);
      console.log(data.prestataires) 

      console.log('yes')

    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log('no')

    }
  };

  useEffect(() => {
    fetchServices();

  }, 
  []
  ); 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    
  

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
