import React from 'react';
import image from './fd4a7e0bf3f55d8b9da80568d21d9a51.png'
import bpic from './6f38207e8c3572bc2e268a7583a977e1-removebg-preview 1.png'
import tpic from './38786172fae47ea7498bd3d245d709f3-removebg-preview 1.png'
import Header from './header copy';
import Navbar from '../homePage/navbar';
import Footer from '../footerfile.jsx/footer';

const Apropos = () => {
  return (
   
    
   <div>
    <Header/>
    <Navbar/>
    <div className="w-full h-screen flex flex-col  relative">
    <div className="absolute top-0 left-0">
      <img src={tpic} alt="Top Image" className="w-[95px] h-[162px]" />
    </div>
    <div className="flex flex-col items-center justify-center flex-grow">
    <div  className="mr-[1355px] mb-[5px]">
    <h3
        style={{
          fontFamily: 'Klaristha',
        }}
        className="font-[5px] text-[50px] leading-[72px]"
      >
        A Propos
      </h3>
    </div>
      <div className="flex  items-center w-4/5  gap-[24px] ">
        <div className=" ">
          <img alt="A propos" src={image} className="w-[850px] h-[552px]" />
        </div>
        <div className="w-2/5  text-left ">
          <p className="font-klaristha text-[24px] leading-[36px] font-semibold text-[#323232] mb-8">
            Welcome to Radiance Beauty Center, where every treatment is a journey
          </p>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '100',
              fontSize: '20px',
              lineHeight: '32px',
            }}
            className="text-[#323232] font-light w-full "
          >
            Nestled in the heart of the city, our center combines the comfort of a home with the luxury of a spa. Here, we believe that true beauty begins from within, and our expert team is dedicated to helping you look and feel your best.
From relaxing facials to transformative skin therapies, each service is designed to nourish your body, mind, and soul. Whether you're preparing for a special occasion or simply indulging in some well-deserved 'me time,' we offer a personalized experience tailored just for you.
Step into Radiance, and let us bring out your natural glow.
Welcome to Radiance Beauty Center, where every treatment is a journey to self-care and rejuvenation. Nestled in the heart of the city, our center combines the comfort of a home with the luxury of a spa. Here, we believe that true beauty begins from within, and our expert team is dedicated to helping you look and feel your best.
          </p>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 right-0">
      <img src={bpic} alt="Bottom Image" className="w-[268px] h-[365px]" />
    </div>
  </div>
  <Footer/>
  </div>
  );
};

export default Apropos;