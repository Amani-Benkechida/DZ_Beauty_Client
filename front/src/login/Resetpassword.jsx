import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  // State for the email form
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  // State for the reset password form
  const [newPassword, setNewPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  // Handle email submission to request reset link
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/reset-password', { email });
      setEmailMessage(response.data.message);
      setEmailError('');
    } catch (err) {
      setEmailError(err.response?.data?.detail || 'An error occurred');
      setEmailMessage('');
    }
  };

  // Handle reset password form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password mismatch validation
    if (newPassword !== retryPassword) {
      setResetError('Passwords do not match');
      return;
    } else {
      setResetError('');
    }

    // Assuming password reset logic is successful
    setResetMessage('Your password has been successfully reset!');
    setNewPassword('');
    setRetryPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <div className="w-full max-w-md p-6 mt-10 absolute top-10">
        
        {/* Email form to request password reset */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 mt-6">
          <h2 className="text-2xl font-medium text-left text-gray-800">Reset Your Password</h2>
          <p className="text-sm text-left text-gray-600">Enter your email to receive a password reset link</p>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* Error Message for email */}
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          {emailMessage && <p className="text-green-500 text-sm">{emailMessage}</p>}

          {/* Submit Button for email */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-button_hover rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            SEND RESET LINK
          </button>
        </form>

        {/* Password reset form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <h2 className="text-2xl font-medium text-left text-gray-800">Enter New Password</h2>
          <p className="text-sm text-left text-gray-600">Type in your new password</p>

          {/* New Password Field */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={retryPassword}
              onChange={(e) => setRetryPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-300 focus:border-pink-500"
            />
          </div>

          {/* Error Message for reset password */}
          {resetError && <p className="text-red-500 text-sm">{resetError}</p>}
          {resetMessage && <p className="text-green-500 text-sm">{resetMessage}</p>}

          {/* Submit Button for resetting password */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-button_hover rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            RESET PASSWORD
          </button>
        </form>

        {/* Back to Login Button */}
        <button
          className="w-full py-2 mt-4 text-white bg-black rounded-md hover:bg-button_hover focus:outline-none"
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

export default ResetPassword;
