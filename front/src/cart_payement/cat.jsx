import React, { useState } from 'react';

import Header from '../homepage/header';
import Navbar from "../homepage/navbar"
import Footer from '../footerfile/footer';
const Cart = ({ cartItems = [], dateFromDB }) => {
  

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.amount, 0);


  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expiration: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expiration: '',
    postalCode: '',
  });

  const [showOverlay, setShowOverlay] = useState(true); // Assuming overlay is shown initially

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically updates the state based on input field name
    });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check if all fields are required
    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        formErrors[field] = `${field} is required`;
        isValid = false;
      }
    });

    // Check if cardNumber, cvv, expiration, and postalCode are numbers
    if (isNaN(formData.cardNumber)) {
      formErrors.cardNumber = 'Card number must be a number';
      isValid = false;
    }
    if (isNaN(formData.cvv)) {
      formErrors.cvv = 'CVV must be a number';
      isValid = false;
    }
    if (isNaN(formData.expiration)) {
      formErrors.expiration = 'Expiration must be a number';
      isValid = false;
    }
    if (isNaN(formData.postalCode)) {
      formErrors.postalCode = 'Postal code must be a number';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
      // Handle form submission (e.g., send data to API)
    }
  };
  

  return (
    <div>
    
    <div className="relative flex flex-col p-6 bg-gray-100 min-h-screen font-poppins">
      {/* Main Content */}
      <div className="w-4/5 bg-white shadow-md">
        <div className="p-6">
          {/* Date and Time */}
          <div className="flex justify-between items-center w-full mb-6">
            <div className="text-[#CB8587] text-lg font-semibold">
              {dateFromDB || "Loading date..."} {/* Placeholder for date */}
            </div>
            {/* yedi lel services page */}
            <button className="h-[44px] bg-buttonColor text-white w-[184px] hover:bg-button_hover">
              Add service
            </button>
          </div>

          {/* Service List */}
          <div className="space-y-4 rounded">
            <div className="flex justify-between items-center text-center font-poppins font-medium text-[20px] leading-[30px]">
              <p>Description</p>
              <p>Amount</p>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-semibold">{item.description}</p>
                      <p className="text-sm text-gray-600">Stylist: {item.stylist}</p>
                    </div>
                    <p className="text-gray-800 font-semibold">{item.amount} DA</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 mt-4">No items in the cart</p> // No items message
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-lg font-semibold text-gray-800">Total</p>
            <p className="text-lg font-semibold text-gray-800">{totalAmount} DA</p>
          </div>

          {/* Buttons */}
          <div className="mt-6">
            
            <button
              onClick={() => setShowOverlay(cartItems.length > 0)} // Show overlay only if there are items in the cart
              className="w-full bg-black text-white py-3 hover:bg-button_hover transition"
            >
              Book reservation
            </button>
          </div>
        </div>
      </div>
   
      </div>
      {/*MENA TEBDA */}
      {/* Overlay */}
      {showOverlay && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-md rounded w-[80%] max-w-[800px]">
            <h2 className="text-xl font-semibold mb-4">Enter Your Infos</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Name on card */}
                <div>
                  <label className="block text-[16px] leading-[24px] text-[#323232] mb-1">
                    Name on card
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    className="w-full h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                  />
                  {errors.nameOnCard && <p className="text-red-500">{errors.nameOnCard}</p>}
                </div>

                {/* Card number */}
                <div>
                  <label className="block text-[16px] leading-[24px] text-[#323232] mb-1">
                    Card number
                  </label>
                  <input
                    type="number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                  />
                  {errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}
                </div>

                {/* CVV, Expiration, Postal Code */}
                <div className="flex gap-6">
                  <div>
                    <label className="block text-[16px] leading-[24px] text-[#323232] mb-1">
                      CVV
                    </label>
                    <input
                      type="number"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                    />
                    {errors.cvv && <p className="text-red-500">{errors.cvv}</p>}
                  </div>
                  <div>
                    <label className="block text-[16px] leading-[24px] text-[#323232] mb-1">
                      Expiration
                    </label>
                    <input
                      type="number"
                      name="expiration"
                      value={formData.expiration}
                      onChange={handleChange}
                      className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                    />
                    {errors.expiration && <p className="text-red-500">{errors.expiration}</p>}
                  </div>
                  <div>
                    <label className="block text-[16px] leading-[24px] text-[#323232] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="number"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                    />
                    {errors.postalCode && <p className="text-red-500">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="mt-4 bg-black text-white px-4 py-2 w-full hover:bg-button_hover">
                Checkout
              </button>

              {/* Close Overlay Button */}
              <button
                onClick={() => setShowOverlay(false)}
                className="mt-4 text-red-500 hover:text-red-700 w-full"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      {/*MENA TEKMEL */}
    </div>
  );
};

export default Cart;
