import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(""); // State to store error messages

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/reservations");
      setCartItems(response.data); // Update state with fetched cart items
      console.log("Cart items fetched successfully:", response.data);
    } catch (err) {
      console.error("Error fetching cart items:", err.response?.data || err.message);
      setError("Failed to load cart items.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.amount, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }




  // services/api.js
  const fetchReservationsByUser=async(userId)=> {
  try {
    const response = await fetch(`http://localhost:8000/userres/${userId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
  console.log(data);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error;
  }
}
fetchReservationsByUser(7)


  return (
    <div className="p-6 bg-gray-100 min-h-screen font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>
      <div className="bg-white shadow-md rounded p-6">
        {/* Cart Items */}
        <div className="space-y-4">
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
            <p className="text-center text-gray-600 mt-4">No items in the cart</p>
          )}
        </div>

        {/* Total Amount */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <p className="text-lg font-semibold text-gray-800">Total</p>
          <p className="text-lg font-semibold text-gray-800">{totalAmount} DA</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;