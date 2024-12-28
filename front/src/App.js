import logo from './logo.svg';
import './App.css';
import Cards from './componenets/cards/Cards.js';
import { Signup } from './auth/signup.js';

import { login } from './auth/login.js';
import Offrescard from './componenets/cards/Ofrrescard.js';
import Cardsprestatiare from './componenets/cards/Cardsprestatiare.js';
import ContactUs from './componenets/cards/ContactUs.js';
import Login from './auth/login.js'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from './homepage/header.js'
import  Navbar from './homepage/navbar.js'
import Hello from './homepage/hello.js'
import Ofrrescard from './componenets/cards/Ofrrescard.js';
import AboutUs from './homepage/aboutUs.js';
import Home from './homepage/Home.js';
import Pres from './comp/Pres.js';
import PRESES from './comp/PRESES.js';
import Comp from './comp/Comp.js';
import Onclick from './comp/Onclick.js';
import { StylistProvider } from './StylistProvider.js';
import Profil from './profile/Profile.js';
import Sidebar from './sidebare/Sidebare.js';
import Services from './services/Services.js';
import Ofres from './services/Ofres.js';
import Contactus from './sidebare/Contact.js'
import Profile from './homepage/profile.js';
function App() {
  return (
    <div className="App">
{/* <Header/>
<Navbar/>

<div className='ml-7 mr-5 mt-0'>
  <Onclick/>
  </div> */}
     
      <StylistProvider>
     
        <Router>
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/offers" element={<Ofres/>} />
          <Route path="/Contactus" element={<Contactus/>} />

            <Route exact path="/comp" element={<Comp/>} />
            <Route path="/detail" element={<Onclick />} />
            <Route path="/profile" element={<Sidebar/>} />
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            

            
          </Routes>
        </Router>
      </StylistProvider>
  
  

 
    </div>
  );
}

export default App;
