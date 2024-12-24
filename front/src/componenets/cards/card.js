import react from 'react'
import './card.css'
import img from './arrow-right.png'

const Card=({image,name})=>{




    return(
        <div  className='mCrds  '>
        <img style={{width:"100%"}} class='' src={image}/>
        <div className='mname' style={{fontSize:'40px',fontWeight:'100'}} >
        {name}
      
        </div>

        <button  style={{fontSize:'15px',fontWeight:'100'}} className="mbutton flex items-center font-poppins  relative space-x-2">
  View More
  <img src={img} alt="icon" className="w-6 h-5 absolute right-5" />
</button>
        </div>

    )

}
export default Card
   




