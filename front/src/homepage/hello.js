import React from 'react';
import image from "./image.png";
import but from "./ourservicesgroupe.png";

export const Hello = () => {
  return (
    <div className="w-full relative font-poppins">
      <img src={image} className="w-full" alt="Background" />
      
      {/* Centered container for buttons, moved slightly lower */}
      <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6">
        
        {/* Book Now button */}
        <button className="w-[244px] h-[67px] bg-buttonColor text-white font-medium text-[22px] rounded hover:bg-black">
          Book Now
        </button>

        {/* Our Services button */}
        <button className="w-[244px] h-[67px] hover:text-button_hover rounded flex items-center gap-4">
          <img className="h-[48px] w-[44.9px]" src={but} alt="Our Services" />
          <p className="font-[500] w-[126px] h-[30px] text-[20px]">Our Services</p>
        </button>
      </div>
    </div>
  );
};

export default Hello;
