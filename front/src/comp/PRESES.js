import React from 'react';
import Pres from './Pres';
import image1 from './A.png'
import image2 from './B.png'
import data from '../info.json';

const PRESES = () => {
  const firstStylist = data.stylists[0];
  const secondStylist= data.stylists[1];
  

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
