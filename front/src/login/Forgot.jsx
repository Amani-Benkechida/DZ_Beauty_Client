import React, { useState } from 'react';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email address is required');
    } else {
      setError('');
      // Simulate API call to send email for reset (you can replace it with actual API integration)
      console.log('Email submitted for password reset:', email);
      // Redirect to next step, e.g., Enter Code page
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
      <div className="flex justify-center mt-12 space-x-4 text-sm text-gray-500 absolute bottom-24">
        <a href="#" className="hover:underline">Terms and conditions</a>
        <span>•</span>
        <a href="#" className="hover:underline">Privacy policy</a>
      </div>
    </div>
  );
};

export default Forgot;
