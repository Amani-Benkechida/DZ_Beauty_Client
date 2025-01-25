import React from 'react'
import img from './shopping-cart.png'
import axios from "axios"; // Import axios for API calls

const Offercard = ({image,name,time,price,discount}) => {
    const newprice =price-price*discount/100
  return (
    <div  className='mCrds font-poppins   '>
        <div class='relative'>
    <img style={{width:"100%"}} class='' src={image}/>
    <button className="mbutton flex items-center   relative  space-x-3 text-center">
    <img src={img} alt="icon" className="w-6 h-5  ml-16" />
    <div class='text-center absolute right-24 top-3 text-base font-poppins'>
    Book Now</div>

     </button>
    </div>
    <div  style={{fontSize:'20px',fontWeight:'100'}} >
        <div>   {name}</div>
<div class='text-sm' style={{color:'#6F6F6F'}}>    {time}</div>
<div class='flex gap-4'>
    <div style={{color:'#CB8587'}} class='text-sm'>{newprice}DA</div>
    <div class='line-through text-sm' style={{color:'#C1C1C1'}}>    {price}DA</div>

    
</div>


  
    </div>

   
    </div>
  )
}

export default Offercard