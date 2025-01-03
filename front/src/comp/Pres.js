import React from 'react'
import imae from './Frame 1000001083.png' 
import icon from './Vector (1).png'
import {useStylists} from '../StylistProvider'

import { useNavigate } from 'react-router-dom';

const Pres = ({id,name, profision, exprience,price,image}) => {
  const {fun} = useStylists();
   const navigate = useNavigate();
  return (
    <div>
        <div   style={{width:"100%"}} className=' '>
        <img style={{width:"100%"}} className='shadow-xs' src={imae} alt="hello"/>
        <div className='text-darkgray'  style={{fontSize:'  38px',fontWeight:'100'}} >
     {name}
        </div>

        <div className='font-poppins text-darkgray '  style={{fontSize:'15px',fontWeight:'800'}} >
        {profision}
        </div>
        <div className='font-poppins text-darkgray '  style={{fontSize:'15px',fontWeight:'100'}} >
        Level of Expertise : {exprience}
        </div>
        <div  className='font-poppins text-darkgray ' style={{fontSize:'15px',fontWeight:'100'}} >
        Price : {price}
        </div>


        <button onClick={()=>{fun(id);navigate("/detail")}}  style={{fontSize:'15px',fontWeight:'100'}} className="mbutton flex items-center font-poppins mt-3  relative space-x-2">
        Consult Portfolio
  <img src={icon} alt="icon" className="w-2 h-3 absolute right-5" />
</button>
        </div>

    </div>
  )
}

export default Pres