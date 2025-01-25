import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For success messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email address is required');
      return;
    }

    try {
      // Make API call to send reset password email
      const response = await axios.post('http://127.0.0.1:8000/auth/reset-password', { email });
      setMessage(response.data.message); // Success message from the backend
      setError('');
      navigate('/next')
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while processing the request.');
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="w-full max-w-md p-8 space-y-6 mt-12 absolute top-10">
        <h2 className="text-2xl font-bold text-left text-gray-800">Reset your password</h2>
        <p className="text-sm text-left text-gray-600">Type in your registered email address to reset password</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address *"
              required
              className="block w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {message && <p className="text-green-500 text-xs mt-1">{message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-button_hover rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            
          >
            NEXT →
          </button>
        </form>
        <button
          className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-button_hover focus:outline-none" 
          onClick={() => navigate("/backtologin")}
        >
          BACK TO LOGIN
        </button>
      </div>
      <div className="flex justify-center mt-12 space-x-4 text-sm text-gray-500 absolute bottom-24">
        <a href="#" className="hover:underline">Terms and conditions</a>
        <span>•</span>
        <a href="#" className="hover:underline">Privacy policy</a>
      </div>
    </div>
  );
};

export default Forgot;
