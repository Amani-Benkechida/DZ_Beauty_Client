import react from 'react'
import Card from './card'
import img from './Column.png'
import img2 from './Column (1).png'
import img3 from './Column (2).png'
import img4 from './Column (3).png'

import Offercard from './offercard'
import { useNavigate } from 'react-router-dom'

const Ofrrescard = () => {
  const navigate=useNavigate()
 const  price=1500
  const discount=10
  return (
    <div class=' mt-6'>
  
    <div class='flex relative mb-16 '>
        <div class='bg-darkpink w-5 h-14 absolute ml-16'>
       
        </div>
        <div  class='font-thin h-10 ml-24 ' style={{fontSize:'60px'}}>
        Our Offers
        </div>
        <button onClick={()=>navigate('/offers')} class='bg-darkgray absolute  h-10 top-5 w-24 font-poppins right-16' style={{color:'#FFFFFF' ,fontSize:'16px'}}>View All</button>
      
    </div>
    <div class='flex font-thin gap-6 justify-center '>
    <Offercard image={img} name='Full Day Package' time="Monday to wednsday ( 5AM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img4} name='Nail Care Package'  time="All Year ( 5PM - 9PM)" price={price} discount={discount}  />
    <Offercard image={img3} name='Massage Day ( SPA ...)'  time="November Pack ( 5PM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img2} name='Facial & Skin care Pack'  time="November Pack ( 5PM - 9PM)" price={price} discount={discount}/>
    </div>
</div>
  )
}

export default Ofrrescard