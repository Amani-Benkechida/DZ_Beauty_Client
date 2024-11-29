import React from 'react';
import image from './aboutimg.png'; // Ensure the image is correctly imported

const AboutUs = () => {
  return (
    <div className="flex"> {/* Use flex for a side-by-side layout */}
      <div className="w-1/2">
        <img src={image} alt="About Us" className="w-full" /> {/* Self-closing tag */}
      </div>
      <div className="w-1/2">
        <h3 className='size-[72px] '>About US</h3>
        <p>Welcome to Radiance Beauty Center, where every treatment is a journey to self-care and rejuvenation. Nestled in the heart of the city, our center combines the comfort of a home with the luxury of a spa. Here, we believe that true beauty begins from within, and our expert team is dedicated to helping you look and feel your best.
From relaxing facials to transformative skin therapies, each service is designed to nourish your body, mind, and soul. Whether you're preparing for a special occasion or simply indulging in some well-deserved 'me time,' we offer a personalized experience tailored just for you.
Step into Radiance, and let us bring out your natural glow.</p>
      </div>
    </div>
  );
};

export default AboutUs;
