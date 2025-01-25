import react,{useEffect,useState} from 'react'
import Card from './card'
import img from './632f0043407de42f8ef18ffc12db5239 (2).png'
import img2 from './7bb8db63e5af18b6069918087ef264cd.png'
import img3 from './b2b4be3cb9acece250625b523eb0897b.png'
import img4 from './dc0d48b038634e9948e26bb073555422.png'
 import nadjma from './Polygon 2.png' 
 import { useTranslation } from'react-i18next';



const Cards=()=>{
      const { i18n, t } = useTranslation(); 

  // Function to fetch services and prestataires
  
 
    
        return(

            <div class=' bg-babypink p-16 relative '>
                <img class='absolute right-0 top-0 '  src={nadjma}/>
                <div class='flex relative mb-16'>
                    <div class='bg-darkpink w-5 h-14 absolute left-0'>
                   
                    </div>
                    <div  class='font-thin h-10 ml-7 ' style={{fontSize:'50px'}}>

                    {t('ourServices')}
                    </div>
                  
                </div>
                <div className='flex font-thin gap-10'>
      <Card image={img} name={t('services.hair')} click='hair' /> {/* Translated name for Hair services */}
      <Card image={img4} name={t('services.facials')} click='facial' /> {/* Translated name for Facials & Skin Care */}
      <Card image={img3} name={t('services.nails')} click='nail' /> {/* Translated name for Nail Care */}
      <Card image={img2} name={t('services.body')} click='body' /> {/* Translated name for Body Therapy */}
    </div>
            </div>
           
        )
    
    }
    export default Cards