import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecoveryEmailSent = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(''); // Email to be passed to the backend
  const [newPassword, setNewPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!code || !email) {
      setError('Email and code are required');
      return;
    }

    if (newPassword !== retryPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // API call to validate the reset token and update the password
      const response = await axios.post('http://127.0.0.1:8000/auth/validate-reset-token', {
        email,
        reset_token: code,
        new_password: newPassword,
      });

      // Handle success
      setSuccessMessage(response.data.message);
      setError('');
      setNewPassword('');
      setRetryPassword('');

      // Redirect to login page after a delay
      setTimeout(() => navigate('/backtologin'), 3000);
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.detail || 'An error occurred while resetting the password.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <div className="w-full max-w-md p-6 mt-10 absolute top-10">
        <form className="space-y-4 mt-6" onSubmit={handlePasswordReset}>
          <h2 className="text-2xl font-medium text-left text-gray-800">Reset Your Password</h2>
          <p className="text-sm text-left text-gray-600">
            Enter your email, code, and new password to reset your password.
          </p>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* Code Field */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 text-left">
              Enter Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="ENTER CODE"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* New Password Field */}
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 text-left">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="retry-password" className="block text-sm font-medium text-gray-700 text-left">
              Confirm New Password
            </label>
            <input
              type="password"
              id="retry-password"
              placeholder="Confirm New Password"
              required
              value={retryPassword}
              onChange={(e) => setRetryPassword(e.target.value)}
              className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button
            type="submit"
            className="w-full py-2 text-white bg-button_hover rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Submit
          </button>
        </form>

        <button
          className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-button_hover focus:outline-none"
          onClick={() => navigate("/backtologin")}
        >
          BACK TO LOGIN
        </button>
      </div>

      {/* Footer Links */}
      <div className="flex justify-center mt-8 space-x-4 text-sm text-gray-500 absolute bottom-24">
        <a href="#" className="hover:underline">Terms and conditions</a>
        <span>•</span>
        <a href="#" className="hover:underline">Privacy policy</a>
      </div>
    </div>
  );
};

export default RecoveryEmailSent;
