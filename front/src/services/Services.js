import React from 'react'
import Card from '../componenets/cards/card'
import img from '../componenets/cards/632f0043407de42f8ef18ffc12db5239 (2).png'
import img2 from '../componenets/cards/7bb8db63e5af18b6069918087ef264cd.png'
import img4 from '../componenets/cards/b2b4be3cb9acece250625b523eb0897b.png'
import Navbar from '../homepage/navbar'
import Header from '../homepage/header'
import A from '../comp/A.png'
import B from '../comp/B.png'
import img3 from '../componenets/cards/dc0d48b038634e9948e26bb073555422.png'
import { useTranslation } from'react-i18next';
const Services = () => {
  const { i18n, t } = useTranslation(); 

  return (
    <div  style={{height:'600px'}}>
        <Header/>
        <Navbar/>
        
        <div className='relative'>
            <img className='absolute' src={A}/>

       
       <div class='  font-thin  ml-20'>
       <div className='text-[40px] mb-6 mt-5 '>
     
       {t('ourServices')}
        </div>
        <div className='flex gap-6 ' >
            <div className='' >
                <Card image={img}  name={t('services.hair')} click='hair' /></div>
                <Card image={img3} name={t('services.facials')} click='facial'/>
                <Card image={img4} name={t('services.nails')}  click='nail'  />
                  
                <Card image={img2} name={t('services.body')} click='body'/>
               
             
                </div>
                </div>

                </div>
         


    </div>
  )
}

export default Services