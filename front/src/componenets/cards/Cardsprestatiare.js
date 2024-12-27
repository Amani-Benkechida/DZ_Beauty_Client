import React from 'react'
import Cardperstatire from './Cardperstatire'
import img from './image.png'
import img2 from './image (1).png'
import img3 from './image (2).png'
import img4 from './image (3).png'

import im from './arrow-right.png'

const Cardsprestatiare = () => {
  return (
    <div class='  p-16'>
                
                <div class='flex relative mb-16'>
                    <div class='bg-darkpink w-5 h-14 absolute left-0'>
                   
                    </div>
                    <div  class='font-thin  ml-7 h-20 ' style={{fontSize:'50px'}}>
                    Our Prestataires
                  
                    </div>
                  
                </div>
                <div class='flex font-thin gap-6 '>
                <Cardperstatire image={img} name='Hiba Bella' desc='Nails specialist'/>
                <Cardperstatire image={img4} name='Ner Dekh' desc='Nails specialist'/>
                <Cardperstatire image={img3} name='Amina' desc='Hair specialist'/>
                <Cardperstatire image={img2} name='Ouerdia' desc='Makeup & hair specialist'/>
                </div>
                <div class=" flex items-center justify-center h-48">
  <button style={{background:'#323232', color:'white'}} className="flex items-center  relative space-x-2 w-36 h-10">
     <div class='ml-2 pt-1    text-lg font-poppins '> View More</div>
    <img src={im} alt="icon" className="w-6 h-5 absolute right-3 top-3" />
  </button>
</div>







            </div>
           
  )
}

export default Cardsprestatiare