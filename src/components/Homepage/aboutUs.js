import React from 'react';
import image from './aboutimg.png'; // Ensure the image is correctly imported
import but from './ourservicesgroupe.png';

const AboutUs = () => {
  return (
    <div className="flex justify-center items-center h-screen">
     
      <div className="flex gap-[32px] items-center">
        
        
        <div className=" w1/2 ">
          <img src={image} alt="About Us" className="w-full h-full object-contain" />
        </div>

       
        <div className="w-[599px] h-[424px] flex flex-col justify-between gap-[40px]">
          <p className="font-klaristha text-[72px] leading-[72px] font-thin text-[#323232]">
            About US
          </p>

          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
            }}
            className="text-[#323232] mb-0"
          >
            Welcome to Radiance Beauty Center, where every treatment is a journey to self-care and rejuvenation. Nestled in the heart of the city, our center combines the comfort of a home with the luxury of a spa. Here, we believe that true beauty begins from within, and our expert team is dedicated to helping you look and feel your best.
            From relaxing facials to transformative skin therapies, each service is designed to nourish your body, mind, and soul. Whether you're preparing for a special occasion or simply indulging in some well-deserved 'me time,' we offer a personalized experience tailored just for you.
            Step into Radiance, and let us bring out your natural glow.
          </p>

          
          <button className="w-[244px] h-[67px] rounded flex items-center gap-4">
              <img className="h-[48px] w-[44.9px]" src={but} alt="Our Services" />
              <p className="font-[500] text-[20px]">Our Services</p>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

