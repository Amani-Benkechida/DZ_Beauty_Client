import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(pk_test_51QZWXuR3RIgFjJ6eA26pD3qxd9410kAGzhMsSx7miotBgHV9B2WRFfeY5hxWrjKgrV59DAPrCUjlMLb2nmFAdxnU00qCmXTyvd);

const PaymentDetails = () => {
  const [cards, setCards] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    cvv: "",
    expiration: "",
    postalCode: "",
  });
  const [reservationId, setReservationId] = useState(""); // New State
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleAddCard = () => {
    if (cardDetails.name && cardDetails.cardNumber && cardDetails.cvv && cardDetails.expiration) {
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
          description: `Payment by ${cardDetails.name}`,
          reservation_id: reservationId, // Include reservation_id
        }),
      });

      const { client_secret } = await response.json();

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardDetails.name,
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        await updateStatus(reservationId); // Update status after success
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

      {paymentVisible && (
        <form onSubmit={handlePaymentSubmit} className="mt-4">
          <label>Card Details</label>
          <CardElement options={{ hidePostalCode: true }} className="border p-2" />
          <button
            type="submit"
            disabled={!stripe || loading}
            className="mt-4 bg-black text-white px-4 py-2"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}

      {!paymentVisible && !formVisible && (
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
