import React from 'react'

const Cardperstatire = ({image,name,desc}) => {
  return (
<div  className='mCrds  '>
        <img style={{width:"100%"}} class='' src={image}/>
        <div className='text-center mt-8' style={{fontWeight:'100' ,color:'#000000'}} >
            <div class='text-5xl'>
        {name}</div>
        <div class='text-3xl'>{desc}</div>
      
        </div>

  
        </div>

  )
}

export default Cardperstatire