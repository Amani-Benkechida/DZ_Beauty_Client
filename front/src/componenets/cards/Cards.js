import react,{useEffect,useState} from 'react'
import Card from './card'
import img from './632f0043407de42f8ef18ffc12db5239 (2).png'
import img2 from './7bb8db63e5af18b6069918087ef264cd.png'
import img3 from './b2b4be3cb9acece250625b523eb0897b.png'
import img4 from './dc0d48b038634e9948e26bb073555422.png'
 import nadjma from './Polygon 2.png' 



const Cards=()=>{
    
  // Function to fetch services and prestataires
  
 
    
        return(

            <div class=' bg-babypink p-16 relative '>
                <img class='absolute right-0 top-0 '  src={nadjma}/>
                <div class='flex relative mb-16'>
                    <div class='bg-darkpink w-5 h-14 absolute left-0'>
                   
                    </div>
                    <div  class='font-thin h-10 ml-7 ' style={{fontSize:'50px'}}>
                    Our Services
                    </div>
                  
                </div>
                <div class='flex font-thin gap-10   '>
                <Card image={img} name='Hair services' click='hair'/>
                <Card image={img4} name='Facials & Skin Care'  click='facial' />
                <Card image={img3} name='Nail Care'  click='nail'/>
                <Card image={img2} name='Body Therapy'  click='body'/>
                </div>
            </div>
           
        )
    
    }
    export default Cards