import React from 'react';
import { useTranslation } from 'react-i18next';
import image from './fd4a7e0bf3f55d8b9da80568d21d9a51.png';
import bpic from './6f38207e8c3572bc2e268a7583a977e1-removebg-preview 1.png';
import tpic from './38786172fae47ea7498bd3d245d709f3-removebg-preview 1.png';
import Header from '../homepage/header';
import Navbar from '../homepage/navbar';
import Footer from '../footerfile.jsx/footer';

const Apropos = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <Header />
      <Navbar />
      <div className="w-full h-screen flex flex-col relative  ">
        <div className="">
          <img src={tpic} alt="TOP Image" className="w-[95px] h-[162px] absolute top-0 " />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          
          <div className="flex m-24">
            <div className="bg-green-400 absolute top-0 left-0 w-1/2 pl-16 ">
              <img alt="A propos" src={image} className="w-[850px] h-[552px] absolute top-0 p-10" />
            </div>
            <div className="w-1/2 text-left absolute right-0 top-0 pl-32 pr-32 pb-32 ">
              <p className="font-klaristha text-[24px] leading-[36px] font-semibold text-[#323232] mt-10">
                {t('welcomeMessage')}
              </p>
              <p
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '100',
                  lineHeight: '32px',
                }}
                className="text-[#323232] font-light w-full p-4 "
              >
                {t('aboutText')}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <img src={bpic} alt="Bottom Image" className="w-[150px] h-[365px]" />
        </div>
      </div>
     
      
    </div>
  );
};

export default Apropos;
