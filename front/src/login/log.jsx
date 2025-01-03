import React, { useState } from 'react';
import image from './loginpic.png';
import './login.css';
import flower from './loginflower.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '', checkbox: '' });

  
  const isFormFilled = username.trim() !== '' && password.trim() !== '' && isChecked;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    const newErrors = { username: '', password: '', checkbox: '' };
    if (username.trim() === '') {
      newErrors.username = 'Username or Email is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }
    if (!isChecked) {
      newErrors.checkbox = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with the login
    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('Form Submitted');
      // Handle login logic here (e.g., API call)
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
              You Don’t have an account? <a className="inline-block hover:underline">Sign UP</a>
            </h5>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <p style={{ color: "#6F6F6F" }}>User name Or Email</p>
                <input
                  style={{ borderColor: "#C1C1C1" }}
                  className={`border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-5 ${errors.username ? 'border-red-500' : ''}`}
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              <div>
                <p style={{ color: "#6F6F6F" }}>Password</p>
                <input
                  style={{ borderColor: "#C1C1C1" }}
                  className={`border-solid border p-7 rounded-xl w-full h-10 mt-2 mb-5 ${errors.password ? 'border-red-500' : ''}`}
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              {/* Forgot Password Link */}
              <div className='text-right'>
                <a href='/forgot-password' className='text-blue-500 text-sm hover:underline'>
                  Forgot Password?
                </a>
              </div>
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
            {errors.checkbox && <p className="text-red-500 text-sm">{errors.checkbox}</p>}

            <div>
              <button
                style={{
                  backgroundColor: isFormFilled ? '#323232' : '#C1C1C1',
                  borderRadius: "10px"
                }}
                className='h-12 text-white text-xl w-3/5'
                disabled={!isFormFilled}
              >
                Log In
              </button>
            </div>
          </form>

          <br />
          <p>You Don’t have an account? <a className="hover:underline">Sign UP</a></p>
          <img src={flower} className='absolute bottom-0 right-0' />
        </div>
      </div>
    </div>
  );
};

export default Login;
