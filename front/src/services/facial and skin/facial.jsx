import React from "react";
import image from './image.png';
import ServiceCard from "../sevcard";
import img1 from './img1.png';
import img2 from './img2.png';

import flower from './../loginflower.png';

import Header from "../../homepage/header";
import Navbar from "../../homepage/navbar";
import {useStylists} from '../../StylistProvider'


const Facial = () => {
  const {setIdservice} = useStylists();
  setIdservice(2)
    const services = [
        {
          image: img1,
          title: "Chemical Peel",
          description: "Stylist, Master Stylist, Elite Stylist",
          time: "30 min",
          price: "1000 DA ~ 5000 DA",
        },
        {
          image: img2,
          title: "Deep Skin Detox",
          description: "Stylist, Master Stylist, Elite Stylist",
          time: "1 hour",
          price: "3000 DA ~ 5000 DA",
          
        },
      ];
      
      
      
      
      
      
  return (
    <div className="bg-white px-8 py-12 relative font-poppins">
     <Header/>
     <Navbar/>
      <div className="w-full flex justify-center mb-[48px]">
        <img src={image} className="w-[1224px] h-[300px]" />
      </div>

      {/* What to Expect, Style Consultation, and Three Levels of Expertise */}
      <section className=" flex justify-center items-center  w-full h-[300px] relative">
        <div className=" absolute ">
          <div className="flex flex-row justify-center mb-[24px]">
            {/* What to Expect */}
            <div className="w-[600px]">
              <h2 className="font-klaristha text-[40px] font-light leading-[32.8px] mb-4 text-left">
                What to expect
              </h2>
              <p className="font-poppins text-[16px] font-normal leading-[24px] text-gray-600 text-left">
                Just sit back and relax. Once you choose your stylist level and the service
                that suits your hair goals, our beauty pros will handle the rest. Our licensed
                stylists receive ongoing training, ensuring you'll walk out with a look you love
                and your next appointment on the calendar. See you in the chair!
              </p>
            </div>

            {/* Add the next section here */}
            <div className="w-[600px]">
              <h2 className="font-klaristha text-[40px] font-light leading-[32.8px] mb-4 text-left">
                Style consultation
              </h2>
              <p className="font-poppins text-[16px] font-normal leading-[24px] text-gray-600 text-left">
                Every appointment starts with a consultation. Your stylist will listen closely
                to what you want and study pics that inspire you (or styles you'd rather skip)
                so they can create a look that's totally yours.
              </p>
            </div>
          </div>
          {/* Three Levels of Expertise */}
          <div className="w-[600px]">
            <h2 className="font-klaristha text-[40px] font-light leading-[32.8px] mb-4 text-left">
              Three levels of expertise
            </h2>
            <p className="font-poppins text-[16px] font-normal leading-[24px] text-gray-600 text-left">
              Our stylists have different levels of experience. Pick the one that suits you best.
            </p>
          </div>
        </div>
      </section>

      {/* Title for Hair Services aligned with service cards */}
      <div className="mb-12 text-left w-full max-w-screen-xl mx-auto">
        <h2
          className="font-klaristha text-[72px] font-light leading-[72px] "
          style={{ fontWeight: 250 }}
        >
          Facial
        </h2>
      </div>

      {/* Hair Services Section */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-screen-xl">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      <div className="absolute right-0 bottom-0">
        <img src={flower} alt="" />
      </div>
    </div>
  );
};

export default Facial;
