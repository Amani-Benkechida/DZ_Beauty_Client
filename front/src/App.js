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
import Sidebaradmin from './admin/Sidebaradmin.js';
import Profile from './homepage/profile.js';
import Body from './services/body therapy/body.jsx';
import Hair from './services/Hair/hair.jsx';
import Facial from './services/facial and skin/facial.jsx';
import Nail from './services/Nail/nail.jsx';
import Cart from './cart_payement/cat.jsx';
import PaymentDetails from './cart_payement/payementForm.jsx'
import Edit from './admin/editprofile.js';
 import Apropos from './propos/apropos.jsx'; 
import Forgot from './auth/Forgot.js';
import RecoveryEmailSent from './auth/recoveryemail.jsx';

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
          <Route path="/about" element={<Apropos/>} />
          <Route path="/offers" element={<Ofres/>} />
          <Route path="/Contactus" element={<Contactus/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
         {/*  <Route path="/about" element={<Apropos/>} /> */}

            <Route exact path="/prestataire" element={<Comp/>} />
            <Route path="/detail" element={<Onclick />} />
            <Route path="/profile" element={<Sidebar/>} />
            <Route path="/admin" element={<Sidebaradmin/>}/>
            <Route path="/body" element={<Body/>}/>
            <Route path="/facial" element={<Facial/>}/>
            <Route path="/hair" element={<Hair/>}/>
            <Route path="/nail" element={<Nail/>}/>
                    
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/PaymentDetails" element={<PaymentDetails/>}/>
            <Route path="/Edit" element={<Edit/>}/>
            <Route path="/forgot-password" element={<Forgot/>}/>
            
            <Route path="/next"  element={<RecoveryEmailSent/>}/>
           
            <Route path="/backtologin"  element={<Login/>}/>
            <Route path="/booknow"  element={<Services/>}/>
            <Route path="/addservice"  element={<Services/>}/>


            
          </Routes>
        </Router>
      </StylistProvider>
  
  

 
    </div>
  );
}

export default App;
