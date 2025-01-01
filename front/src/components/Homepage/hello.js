import React from 'react'
import image from "./image.png"
import but from "./ourservicesgroupe.png"
import '../../index.css'
export const Hello = () => {
  return (
    <div className='w-full relative font-poppins '>
        <img src={image} className='w-full'></img>
        <button className='w-[244px] h-[67px] absolute bottom-[240px] left-[692px] bg-buttonColor text-white font-medium text-[22px]  rounded'>Book Now</button>
        
        <button className='w-[244px] h-[67px] absolute bottom-[240px] left-[960px]  hover:text-white rounded'>
          <div className='  flex items-center gap-4 '><img className='h-[48px] w-[44.9px] ' src={but}></img>
           <p className='font-[500] w-[126px] h-[30px] text-[20px] '>Our Services</p>
          </div>
        </button>
    </div>
    
  )
}
export default Hello;
