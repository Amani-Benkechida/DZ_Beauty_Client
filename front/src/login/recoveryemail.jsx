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

  return (
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

      <div className="flex justify-center mt-8 space-x-4 text-sm text-gray-500 absolute bottom-24">
        <a href="#" className="hover:underline">Terms and conditions</a>
        <span>•</span>
        <a href="#" className="hover:underline">Privacy policy</a>
      </div>
    </div>
  );
};

export default RecoveryEmailSent;
