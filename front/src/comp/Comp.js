import React from 'react'
import PRESES from './PRESES'
import Header from '../homepage/header'
import Navbar from '../homepage/navbar'
import img from './A.png'
import im from './B.png'
const Comp = () => {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div className='relative '>
      <img src={img} className="  absolute " />
      <PRESES/>
      <img src={im} className='absolute right-0  bottom-0' /></div>

    </div>
  )
}

export default Comp