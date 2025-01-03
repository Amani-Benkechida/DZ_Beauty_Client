import React from 'react'
import Ofrrescard from '../componenets/cards/Ofrrescard'
import Offercard from '../componenets/cards/offercard'
import img from '../componenets/cards/Column.png'
import img2 from '../componenets/cards/Column (1).png'
import img3 from '../componenets/cards/Column (2).png'
import img4 from '../componenets/cards/Column (3).png'
import Navbar from '../homepage/navbar'
import Header from '../homepage/header'
import A from '../comp/A.png'



const Ofres = () => {
    const  price=1500
  const discount=10

  return (
    <div className='relative'>
        <Header/>
        <Navbar/>
        <img src={A} className='absolute top-12 z-10'/>
   
        <div className='ml-10 mr-10 mt-10 pl-16 '>


       
        <div className='text-[40px]'>Our Offers</div>
     
         <div class='grid grid-cols-4 font-thin gap-6 justify-center mt '>
    <Offercard image={img} name='Full Day Package' time="Monday to wednsday ( 5AM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img4} name='Nail Care Package'  time="All Year ( 5PM - 9PM)" price={price} discount={discount}  />
    <Offercard image={img3} name='Massage Day ( SPA ...)'  time="November Pack ( 5PM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img2} name='Facial & Skin care Pack'  time="November Pack ( 5PM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img} name='Full Day Package' time="Monday to wednsday ( 5AM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img4} name='Nail Care Package'  time="All Year ( 5PM - 9PM)" price={price} discount={discount}  />
    <Offercard image={img3} name='Massage Day ( SPA ...)'  time="November Pack ( 5PM - 9PM)" price={price} discount={discount}/>
    <Offercard image={img2} name='Facial & Skin care Pack'  time="November Pack ( 5PM - 9PM)" price={price} discount={discount}/>
    </div>
    </div>



    </div>
  )
}

export default Ofres