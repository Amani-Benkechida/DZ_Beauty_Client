import React from 'react'

import image from './upscaled_image.png'
import icon from './Vector (1).png'
 import {useStylists} from '../StylistProvider'

import { useState } from 'react';
import img from './Column (1).png'
import vect from './Vector (2).png'
import Calenda from './C';
import robot from './google_recaptcha-official 2.png'
import datas from '../info.json'
import axios from 'axios';

const Onclick = () => {
  const {stylist,Oclick} = useStylists();
  const freeday = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [date, setDate] = useState(new Date());
    console.log("hello context")
    console.log(Oclick);
    const data = datas.stylists[parseInt(Oclick, 10)]
    console.log(data)

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 13; hour <= 23; hour++) {
      const start = `${hour}:00`;
      const end = `${hour + 1}:00`;
      slots.push(`${start} to ${end}`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();
  const [login,setLogin]=useState(false);
  const [Sign,setSign]=useState(false);
  
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);
    const [clickedDates, setClickedDates] = useState([]);
    const [interd,setInterd]=useState([])
    const [afiche,setafiche]=useState(false)
    const [globaldate,setdateGlobal]=useState(false)
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

      // Login form state
      const [username, setUsername] = useState('');
      const [signupEmail, setSignupEmail] = useState('');
      const [signupPassword, setSignupPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [signupError, setSignupError] = useState('');
    const handleClick = (date) => {
      if (!freeday.includes(date)) {
        // Handle non-free day clicks
        if (clickedDates.includes(date)) {
          setClickedDates(clickedDates.filter((d) => d !== date)); // Deselect
        } else {
          setClickedDates([date]); // Select a new date
        }
        setInterd([]);
      } else {
        // Handle free day clicks
        setInterd([date]);

        setClickedDates([]); // Clear non-free dates when a free date is selected
      }
      setdateGlobal(date);
    };
    


    const afichagedetab = (selectedDate) => {
      if (freeday.includes(selectedDate)) {
        setafiche(false); // Hide table if the date is a free day
      } else {
        setafiche(true); // Show table otherwise
      }
    };
    const handleSignup = async () => {
      if (signupPassword !== confirmPassword) {
        setSignupError("Passwords do not match!");
        return;
      }
    
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/signup", {
          username,
          email: signupEmail,
          password: signupPassword,
        });
        alert(response.data.message);
        setSign(false); // Close the sign-up modal
      } catch (error) {
        if (error.response) {
          setSignupError(error.response.data.detail || "Sign-up failed");
        } else {
          setSignupError("An unexpected error occurred");
        }
      }
    };
    
    

   



    const handleLogin = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/login", {
          email:email,
          password: password,
        });
        console.log(response.data); 
        alert(response.data.message); 
      
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.detail || "Login failed");
        } else {
          setErrorMessage("An unexpected error occurred");
        }
      }
    };
   



  return (
    <div  className='p-10   relative    '>

<div  className={login ? 'p-10 inset-0  filter blur-sm z-0 ':'p-10 inset-0 z-0'}>
  


        <div className='text-darkgray '  style={{fontSize:'60px',fontWeight:'100'}} >
        Mrs. {data.name}
        </div>
<div className='flex gap-10'>
    <div className='w-3/4' >
        <div className='font-poppins text-darkgray '  style={{fontSize:'15px',fontWeight:'800'}} >
      {data.profession}
        </div>
        <div className='font-poppins text-darkgray'  style={{fontSize:'15px',fontWeight:'800'}} >
        Level of Expertise : {data.expertiseLevel}
        </div>
        <div  className='font-poppins text-darkgray ' style={{fontSize:'15px',fontWeight:'800'}} >
        Price :{data.price}
        </div>
        
<img  className='shadow-lg shadow-gray-400' style={{width:"100%",height:"400px"}}  src={image}/>
<br/>
<div>
    <div  style={{fontSize:'20px',fontWeight:'800'}} className='font-poppins mb-4'>Description</div>
    <div className='font-poppins' style={{color:'#6F6F6F',fontSize:'10px'}}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div className='mt-4'>
    <div  style={{fontSize:'20px',fontWeight:'800'}} className='font-poppins mt-4 mb-4'>
    MY WORK
    </div>
    <div className='grid grid-cols-3 gap-3'>
      <img src={img}/>
      <img src={img}/>  <img src={img}/>  <img src={img}/>  <img src={img}/>
      <img src={img}/>
      
     
    </div></div>
    <div>

    </div>
</div>
</div>
<div>
  

<div className="calendrier-container">
      <h1 className='font-poppins text-xl'>Choose Date :</h1>
      <div className="p-4 max-w-md mx-auto shadow-lg shadow-gray-400 bg-white  rounded-lg font-poppins mt-4">
      <h2 className="text-lg font-semibold text-center mb-4">June 2024</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day) => (
          <div key={day} className="text-black-700 font-medium">
            {day}
          </div>
        ))}
   {dates.map((date) => (
  <button
    key={date}
    onClick={() => {
      handleClick(date);
      afichagedetab(date);
    }}
    className={`p-2 rounded-full transition-colors ${
      clickedDates.includes(date)
        ? "bg-buttongreen text-white" // Selected non-free date
        : interd.includes(date)
        ? "bg-button_hover text-white" // Selected free day
        : freeday.includes(date)
        ? "text-red-500" // Free day (not clicked)
        : "text-black-700" // Default state
    }`}
  >
    {date}
  </button>
))}

      </div>
      <div className="mt-4 text-center"></div>
    </div>
  
      
      
      
      
      
      
      
      

      </div>
      { afiche===true  &&
        <div className=''>
      <h1 className='font-poppins text-xl mt-4 mb-4'>Choose Time :</h1>
       <div className='font-poppins    bg-white shadow-lg shadow-gray-400 rounded-lg pb-4 ' >
      
     <div className='bg-SecondaryColor w-auto  text-darkgray p-2'>
     Monday 22 December
      
     </div>
      <div>
   

      
      </div><div>
  <div className="border p-2 mb-2 mt-2 rounded-lg shadow-amber-100 m-4 flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>8 AM - 9 AM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg flex m-4   items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>9 AM - 10 AM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg flex m-4  items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>10 AM - 11 AM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>11 AM - 12 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4 text-red-500  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3  accent-green-600 border rounded-full"
    />
    <span>12 PM - 1 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>1 PM - 2 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>2 PM - 3 PM</span>
  </div>

  <div className="border p-2 mb-2 rounded-lg m-4  flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 mr-3 accent-green-600 border rounded-full"
    />
    <span>3 PM - 4 PM</span>
  </div>

</div>
      



    </div>
    <button className='bg-darkgray w-full  font-poppins flex justify-center gap-2  text-white  p-2 text-sm mt-4'>
      <img src={vect}/>
      <span onClick={()=>{setLogin(true)}} >Book Now</span>
 
  </button></div>}
    </div>
    </div>
    </div>
    

    {login && !Sign&&<div className=''>
    <div className=' font-poppins  shadow-xl shadow-gray-300 absolute bg-white w-1/2 items-center justify-center  left-80 bottom-80 z-50   '>
    <div  className='flex relative text-white' style={{background:"#CB8587"}}>
    <div className='p-2 pl-4'>Log In to continue</div>
    <button onClick={()=>{setLogin(false)}} class="text-white text-2xl bg-none border-none cursor-pointer absolute right-0">
  &times;
</button>


    </div>
    <div className='m-7'>
      <div  style={{color:'#6F6F6F'}} className='pt-2 pb-2'>
      User name Or Email
      </div>
      <input   onChange={(e) => setEmail(e.target.value)} className='w-full border p-2 rounded-lg '   type='text'/>
      <div className='pt-2 pb-2 ' style={{color:'#6F6F6F'}}> Password</div>
      <input   onChange={(e) => setPassword(e.target.value)} type='password' className='w-full border p-2 rounded-lg '/>
      <button onClick={handleLogin} className='w-full text-white  p-2  mt-4' style={{background:"#CB8587"}}>Log In</button>
      <div style={{color:'#6F6F6F'}} className='pt-2  justify-center items-center flex mt-4' >
      Forgot password ?
      </div>
    <div className='border border-b-gray-400 mb-5 mt-4'></div>

      <button  onClick={()=>{setSign(true);}}  className='w-full text-white p-2 ' style={{background:"#CB8587"}}>Create Account</button>

    </div>
    </div></div>}
    {Sign && 


    <div className=''>
    <div className=' font-poppins  shadow-xl shadow-gray-300 absolute bg-white w-1/2 items-center justify-center  left-80 bottom-80 z-50   '>
    <div  className='flex relative text-white' style={{background:"#CB8587"}}>
    <div className='p-2 pl-4'>Create Account</div>
    <button onClick={()=>{setSign(false);setLogin(false)}} class="text-white text-2xl bg-none border-none cursor-pointer absolute right-0">
  &times;
</button>


    </div>
    <div className='m-7'>
      <div  style={{color:'#6F6F6F'}} className='pt-2 pb-2'>
      User name

      </div>
      <input className='w-full border p-2 rounded-lg '   type='text'/>
      <div  style={{color:'#6F6F6F'}} className='pt-2 pb-2'>
       Email
      </div>
      <input  onChange={(e) => setEmail(e.target.value)}  className='w-full border p-2 rounded-lg '   type='text'/>

      <div className='pt-2 pb-2 ' style={{color:'#6F6F6F'}}> Password</div>
      <input type='password' className='w-full border p-2 rounded-lg '/>
      <div className='pt-2 pb-2 ' style={{color:'#6F6F6F'}}>Use 8 or more characters with a mix of letters, numbers & symbols</div>
      <div className='pt-2 pb-2 ' style={{color:'#6F6F6F'}}> Confirm Password</div>
      <input  onChange={(e) => setPassword(e.target.value)}  type='password' className='w-full border p-2  rounded-lg mb-4 '/>
      
      <div className="pb-4">
            <p style={{ color: "#6F6F6F" }} className="text-lg">
              By creating an account, you agree to our
              <div className="flex">
                <p className="pr-2 text-lg" style={{ color: "#323232" }}>
                  Terms of use
                </p>
                <p className="pr-2">and</p>{" "}
                <p style={{ color: "#323232" }} className="text-lg">
                  Privacy Policy
                </p>
              </div>
            </p>
          </div>
          <div className="flex border-black border w-3/4 mb-6 rounded-xl p-4 relative">
            <input
              style={{ borderRadius: "10px" }}
              type="checkbox"
              className="text-white font-bold p-15 mr-5 w-4 rounded accent-green-600"
              name="isNotRobot"


               
              
            />
            <p style={{ color: "#6F6F6F" }} className="text-lg ">
               I'm not a robot
            </p>
            
            <img className=' absolute right-2 bottom-1' src={robot}/>
          </div>
     
      <button Onclick={()=>{handleSignup}} className='w-full text-white p-2 ' style={{background:"#CB8587"}}>Create Account</button>

    </div>
    </div></div>}


      
    </div>


  )
}

export default Onclick