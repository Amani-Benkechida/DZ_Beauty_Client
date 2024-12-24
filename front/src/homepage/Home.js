import React from 'react'
import Header from './header'
import Navbar from './navbar'
import Hello from './hello'
import AboutUs from './aboutUs'
import Cards from '../componenets/cards/Cards'
import Ofrrescard from '../componenets/cards/Ofrrescard'
import Cardsprestatiare from '../componenets/cards/Cardsprestatiare'
import ContactUs from '../componenets/cards/ContactUs'
const Home = () => {
  return (
    <div>   <Header/>
    <Navbar/>
    <Hello/>
    <AboutUs/>
    <Cards/>
    <Ofrrescard/>
   <Cardsprestatiare />
   <div className='bg-babypink'>
   <ContactUs/></div></div>
  )
}

export default Home