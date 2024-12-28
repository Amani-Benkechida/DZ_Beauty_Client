import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import image from './loginpic.png';
import './login.css';
import flower from './loginflower.png';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages

  // Check if form is completely filled
  const isFormFilled = email.trim() !== '' && password.trim() !== '' && isChecked;

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email:email,
        password: password,
      });
      console.log(response.data); 
      alert(response.data.message); 
      navigate("/dashboard"); 
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || "Login failed");
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className='flex content-center h-screen'>
      <div className='w-1/2 h-full'>
        <img className='h-screen w-full' src={image} alt='Login Illustration' />
      </div>
      <div className='w-1/2 mcnter'>
        <div className="object-none h-full content-center mb-11 pb-11" style={{ width: "70%" }}>
          <div className='mb-7'>
            <div style={{ color: "#323232" }} className='font-semibold text-4xl pb-2'>
              Log In
            </div>
            <h5 style={{ color: "#323232" }} className='mb-3'>
              You Don’t have an account? <a className="inline-block hover:underline cursor-pointer">Sign UP</a>
            </h5>
          </div>

          <div>
            <p style={{ color: "#6F6F6F" }}> Email address</p>
            <input
              style={{ borderColor: "#C1C1C1" }}
              className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-5"
              type='text'
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p style={{ color: "#6F6F6F" }}>Password</p>
            <input
              style={{ borderColor: "#C1C1C1" }}
              className="border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-5"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='pb-4'>
            <p style={{ color: "#6F6F6F" }}>You agree to our
              <div className="flex">
                <p className='pr-2' style={{ color: "#323232" }}>Terms of use</p>
                <p className='pr-2'>and</p>
                <p style={{ color: "#323232" }}>Privacy Policy</p>
              </div>
            </p>
          </div>

          <div className='flex border-black border w-3/4 mb-6 rounded-xl p-4'>
            <input
              style={{ borderRadius: "10px" }}
              type='checkbox'
              className='text-white font-bold p-15 mr-5 w-4 rounded'
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p style={{ color: "#6F6F6F" }}>I'm not a robot</p>
          </div>

          <div>
            <button
              style={{
                backgroundColor: isFormFilled ? '#323232' : '#C1C1C1',
                borderRadius: "10px"
              }}
              className='h-12 text-white text-xl w-3/5'
              disabled={!isFormFilled}
              onClick={handleLogin} 
            >
              Log In
            </button>
          </div>

          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 

          <br />
          <p>You Don’t have an account? <a className="hover:underline cursor-pointer">Sign UP</a></p>
          <img src={flower} className='absolute bottom-0 right-0  ' />
        </div>
      </div>
    </div>
  );
};

export default Login;

