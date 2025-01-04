// import React, { useState } from "react";

// const PaymentDetails = () => {
//   const [cards, setCards] = useState([]);
//   const [formVisible, setFormVisible] = useState(false);
//   const [cardDetails, setCardDetails] = useState({
//     name: "",
//     cardNumber: "",
//     cvv: "",
//     expiration: "",
//     postalCode: "",
//   });

//   const handleAddCard = () => {
//     if (
//       cardDetails.name &&
//       cardDetails.cardNumber &&
//       cardDetails.cvv &&
//       cardDetails.expiration
//     ) {
//       setCards([...cards, { ...cardDetails, id: Date.now() }]);
//       setCardDetails({
//         name: "",
//         cardNumber: "",
//         cvv: "",
//         expiration: "",
//         postalCode: "",
//       });
//       setFormVisible(false);
//     }
//   };

//   const handleDeleteCard = (id) => {
//     setCards(cards.filter((card) => card.id !== id));
//   };

//   return (
//     <div className="p-6 bg-gray-100 w-4/5 text-poppins">
    

//       {/* If no cards are available */}
//       {cards.length === 0 && !formVisible && (
//         <div className="text-center bg-white p-6 shadow-md rounded">
//           <p className=" flex justify-start text-[#323232] size-24 text-[20px] w-full font-[400px]">No Saved Cards Available</p>
//           <button
//             onClick={() => setFormVisible(true)}
//             className="mt-4 bg-black text-white px-4 py-2 w-[701px] hover:bg-button_hover"
//           >
//             Add a payment method
//           </button>
//         </div>
//       )}

//       {/* Form to add card */}
//       {formVisible && (
//   <div className="bg-white p-6 shadow-md rounded">
//     <h2 className="text-xl font-semibold mb-4">Add a Card</h2>
//     <div className="space-y-4">
//       {/* Large Input: Name on card */}
//       <div>
//         <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
//           Name on card
//         </label>
//         <input
//           type="text"
//           value={cardDetails.name}
//           onChange={(e) =>
//             setCardDetails({ ...cardDetails, name: e.target.value })
//           }
//           className="w-[719px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
//         />
//       </div>

//       {/* Large Input: Card number */}
//       <div>
//         <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
//           Card number
//         </label>
        
//         <input
//           type="text"
//           value={cardDetails.cardNumber}
//           onChange={(e) =>
//             setCardDetails({ ...cardDetails, cardNumber: e.target.value })
//           }
          
//           className="w-[719px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3 relative"
          
//         />
         
//         </div>
      

//       {/* Small Inputs: CVV and Expiration  & Postal Code */}
//       <div className="flex gap-6 ">
//         <div>
//           <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
//             CVV
//           </label>
//           <input
//             type="text"
//             value={cardDetails.cvv}
//             onChange={(e) =>
//               setCardDetails({ ...cardDetails, cvv: e.target.value })
//             }
//             className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
//           />
//         </div>
//         <div>
//           <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
//             Expiration
//           </label>
//           <input
//             type="text"
//             value={cardDetails.expiration}
//             onChange={(e) =>
//               setCardDetails({
//                 ...cardDetails,
//                 expiration: e.target.value,
//               })
//             }
//             className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
//           />
//         </div>
//         <div>
//         <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
//           Postal Code
//         </label>
//         <input
//           type="text"
//           value={cardDetails.postalCode}
//           onChange={(e) =>
//             setCardDetails({
//               ...cardDetails,
//               postalCode: e.target.value,
//             })
//           }
//           className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
//         />
//       </div>
//       </div>

     
      
//     </div>

//     {/* Submit Button */}
//     <button
//       onClick={handleAddCard}
//       className="mt-4 bg-black text-white px-4 py-2 w-[701px] hover:bg-button_hover"
//     >
//       Add card
//     </button>
//   </div>
// )}




//       {/* Display saved cards */}
//       {cards.length > 0 && (
//         <div className="bg-white p-6 shadow-md rounded">
//           <h2 className="text-xl font-semibold mb-4">Your cards</h2>
//           <div className="space-y-4">
//             {cards.map((card) => (
//               <div
//                 key={card.id}
//                 className="flex justify-between items-center p-3 border rounded"
//               >
//                 <div>
//                   <p>
//                     <strong>Card Number:</strong> {card.cardNumber.replace(/.(?=.{4})/g, "*")}
//                   </p>
                 
//                 </div>
//                 <button
//                   onClick={() => handleDeleteCard(card.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={() => setFormVisible(true)}
//             className="mt-4 bg-black text-white px-4 py-2 w-[701px] hover:bg-button_hover"
//           >
//             Add card
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentDetails;


import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import dahabia from './baridi.png'

const PaymentDetails = () => {
  const [cards, setCards] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
    expiration: "",
    postalCode: "",
  });
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleAddCard = () => {
    if (
      cardDetails.name &&
      cardDetails.cardNumber &&
      cardDetails.cvv &&
      cardDetails.expiration
    ) {
      setCards([...cards, { ...cardDetails, id: Date.now() }]);
      setCardDetails({
        name: "",
        cardNumber: "",
        cvv: "",
        expiration: "",
        postalCode: "",
      });
      setFormVisible(false);
    }
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is not properly loaded.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000, // Example amount in cents
          currency: "eur",
          description: `Payment for reservation ${reservationId}`,
          reservation_id: reservationId,
        }),
      });

      const { client_secret } = await response.json();

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Customer Name", // Replace with dynamic name if needed
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        await updateStatus(reservationId);
      }
    } catch (error) {
      setMessage("An error occurred during the payment process.");
    }

    setLoading(false);
  };

  const updateStatus = async (reservationId) => {
    try {
      const response = await fetch("http://localhost:8000/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reservation_id: reservationId,
          status: "Paid",
        }),
      });
      const data = await response.json();
      console.log("Status updated:", data);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 w-4/5 text-poppins">
      <div>
        <label>Reservation ID</label>
        <input
          type="number"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          placeholder="Enter Reservation ID"
          className="w-full border p-2"
        />
      </div>

      {/* If no cards are available */}
      {cards.length === 0 && !formVisible && (
        <div className="text-center bg-white p-6 shadow-md rounded">
          <p className=" flex justify-start text-[#323232] size-24 text-[20px] w-full font-[400px]">No Saved Cards Available</p>
          <button
            onClick={() => setFormVisible(true)}
            className="mt-4 bg-black text-white px-4 py-2 w-[701px] hover:bg-button_hover"
          >
            Add a payment method
          </button>
        </div>
      )}

      {/* Form to add card */}
      {formVisible && (
        <div className="bg-white p-6 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Add a Card</h2>
          <div className="space-y-4">
            {/* Large Input: Name on card */}
            <div>
              <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1 ">
                Name on card
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
                className="w-[719px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
              />
            </div>

            {/* Large Input: Card number */}
            <div>
              <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
                Card number
              </label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                className="w-[719px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3 relative"
              />
            </div>

            {/* Small Inputs: CVV and Expiration & Postal Code */}
            <div className="flex gap-6 ">
              <div>
                <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                  className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                />
              </div>
              <div>
                <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
                  Expiration
                </label>
                <input
                  type="text"
                  value={cardDetails.expiration}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiration: e.target.value,
                    })
                  }
                  className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                />
              </div>
              <div>
                <label className="block font-poppins font-normal text-[16px] leading-[24px] text-[#323232] mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={cardDetails.postalCode}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      postalCode: e.target.value,
                    })
                  }
                  className="w-[223px] h-[56px] rounded-[12px] border border-[#C1C1C1] p-3"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddCard}
            className="mt-4 bg-black text-white px-4 py-2 w-[701px] hover:bg-button_hover"
          >
            Add card
          </button>
        </div>
      )}

      {/* Display saved cards */}
      {cards.length > 0 && (
        <div className="bg-white p-6 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Your cards</h2>
          <div className="space-y-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <p>
                    <strong>Card Number:</strong> {card.cardNumber.replace(/.(?=.{4})/g, "*")}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setFormVisible(true)}
            className="mt-4 bg-black text-white px-4 py-2 w-[701px] hover:bg-button_hover"
          >
            Add card
          </button>
        </div>
      )}

      {/* Payment Section */}
      {paymentVisible && (
        <form onSubmit={handlePaymentSubmit} className="mt-4">
          <label>Card Details</label>
          <CardElement options={{ hidePostalCode: true }} className="border p-2" />
          < button
            type="submit"
            disabled={!stripe || loading}
            className="mt-4 bg-black text-white px-4 py-2"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}

      {!paymentVisible && (
        <button
          onClick={() => setPaymentVisible(true)}
          className="mt-4 bg-black text-white px-4 py-2"
        >
          Proceed to Payment
        </button>
      )}
    </div>
  );
};

export default PaymentDetails;