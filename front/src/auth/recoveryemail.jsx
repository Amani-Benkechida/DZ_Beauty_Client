import React, { useState } from 'react';

const RecoveryEmailSent = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code) {
      setError('Code is required');
    } else {
      setError('');
      // Simulate API call to verify the code (replace with real API logic)
      console.log('Code submitted for verification:', code);
      // Redirect to the next step, such as creating a new password
    }
  };

  const [newPassword, setNewPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [errorr, setErrorr] = useState('');  // Renamed to 'errorr' as you wanted
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitt = (e) => {  // Renamed to 'handleSubmitt' as you wanted
    e.preventDefault();
    
    // Password mismatch validation
    if (newPassword !== retryPassword) {
      setErrorr('Passwords do not match');  // Using 'errorr' here
      return;
    } else {
      setErrorr('');
    }

    // Assuming password reset logic is successful
    setSuccessMessage('Your password has been successfully reset!');
    setNewPassword('');
    setRetryPassword('');
  };

  return (
    <div>
      {/* Recovery Email Sent Section */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
        <div className="w-full max-w-md p-6 mt-10 absolute top-10">
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-medium text-left text-gray-800">Recovery Email Sent!</h2>
            <p className="text-sm text-left text-gray-600">
              Please check your email for next steps to reset your password.
            </p>
            
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
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
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
            {errorr && <p className="text-red-500 text-sm">{errorr}</p>}  {/* Using 'errorr' */}

            {/* Success Message */}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}


            <button
              type="submit"
              className="w-full py-2 text-white bg-button_hover rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              NEXT →
            </button>
          </form>

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
    </div>
  );
};

export default RecoveryEmailSent;
