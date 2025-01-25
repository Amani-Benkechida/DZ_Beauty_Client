import React, { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password mismatch validation
    if (newPassword !== retryPassword) {
      setError('Passwords do not match');
      return;
    } else {
      setError('');
    }

    // Assuming password reset logic is successful
    setSuccessMessage('Your password has been successfully reset!');
    setNewPassword('');
    setRetryPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
      <div className="w-full max-w-md p-6 mt-10 absolute top-10">
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <h2 className="text-2xl font-medium text-left text-gray-800">Reset Your Password</h2>
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

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {/* Submit Button */}
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
