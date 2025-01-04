import React, { useState } from 'react';

const Header = () => {
  
  return (

      
<div className='pt-2 pb-2 bg-headerBg pl-4 pr-4 text-[#EDDADA]'>
  <div className="flex gap-[231px] justify-end pr-[200px]">
    <p>Summer Sale And Free Express Delivery - OFF 50%!</p>
    <button>Book Now</button>
    <select className='bg-transparent border-none outline-none'>
      <option>Francais</option>
      <option>Arabe</option>
    </select>
  </div>
</div>


    
  );
};

export default Header;