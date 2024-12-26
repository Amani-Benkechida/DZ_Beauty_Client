from fastapi import APIRouter, HTTPException, Depends  # Pour créer le routeur et gérer les exceptions
from pydantic import BaseModel  # Pour définir le modèle de requête
import stripe  # Pour interagir avec l'API Stripe
from typing import Optional  # Pour utiliser Optional dans le modèle
from sqlalchemy.ext.asyncio import AsyncSession  # Pour la gestion des sessions asynchrones
from sqlalchemy import text  # Pour exécuter des requêtes SQL
from setup.deps import get_db  # Pour obtenir la session de base de données
import os  # Pour accéder aux variables d'environnement
from dotenv import load_dotenv  # Pour charger les variables d'environnement depuis un fichier .env
from .send_email import send_confirmation_email

load_dotenv()

sk_test_YOUR_SECRET_KEY = os.getenv("sk_test_YOUR_SECRET_KEY")


router = APIRouter(prefix="/payment", tags=["payment"])

# Replace with your actual Stripe secret key
stripe.api_key = sk_test_YOUR_SECRET_KEY

# Request body schema
class PaymentRequest(BaseModel):
    amount: int  # Amount in cents (e.g., $10 = 1000)
    currency: str  # Currency code (e.g., "usd", "eur")
    description: str  # Description of the payment
    receipt_email: str  # Customer's email
    special_offer_id: Optional[int] = None  # ID of the special offer
    reservation_id: int 

@router.post("/create-payment-intent")
async def create_payment_intent(payment: PaymentRequest, db: AsyncSession = Depends(get_db)):
    print("create_payment_intent called") 
    try:
        # Step 1: Fetch user's current points using user_id
        user_id = payment.receipt_email  # Assuming you have a way to get user_id from the email
        user_result = await db.execute(text(
            "SELECT id FROM users WHERE email = :email"
        ), {"email": payment.receipt_email})
        user = user_result.fetchone()

        if user is None:
            raise HTTPException(status_code=404, detail="User  not found")

        client_id = user[0]  # Get the user_id from the result

        # Step 2: Fetch points from loyalty_program using client_id
        points_result = await db.execute(text(
            "SELECT points FROM loyalty_program WHERE client_id = :client_id"
        ), {"client_id": client_id})
        user_points = points_result.scalar() or 0  # Default to 0 if no points found

        # Step 3: Check if enough points are available for redemption
        discount = 0
        if payment.special_offer_id:
            offer_result = await db.execute(text(
                "SELECT discount_percentage FROM special_offers WHERE id = :offer_id"
            ), {"offer_id": payment.special_offer_id})
            offer = offer_result.fetchone()
            if offer:
                discount = offer[0]  # Get discount percentage

        # Calculate the discount in terms of points (assuming 1 point = 1 cent)
        points_discount = min(user_points, discount)  # Redeem only available points
        final_amount = payment.amount - points_discount  # Adjust final amount
        print(f"Final Amount: {final_amount}")

        # Step 4: Create a PaymentIntent with the final amount
        intent = stripe.PaymentIntent.create(
            amount=int(final_amount),  # Amount in cents
            currency=payment.currency,
            description=payment.description,
            receipt_email=payment.receipt_email,
            payment_method_types=["card"],  # Accept card payments
        )

        # Step 5: Update points in the database if payment is successful
        if final_amount > 0:  # Only deduct points if there's a payment
            await db.execute(text(
                "UPDATE loyalty_program SET points = points - :points_discount WHERE client_id = :client_id"
            ), {"points_discount": points_discount, "client_id": client_id})
            await db.commit()

        # Step 6: Update reservation status to "confirmed"
        reservation_id = payment.reservation_id  # Assuming you pass reservation_id in the request
        await db.execute(text(
            "UPDATE reservations SET status = 'confirmed' WHERE id = :reservation_id"
        ), {"reservation_id": reservation_id})
        await db.commit()

        # Step 7: Send confirmation email
        send_confirmation_email(payment.receipt_email, reservation_id)  

        # Step 8: Return the response
        return {
            "client_secret": intent["client_secret"],  # Return the client secret to the frontend
            "payment_intent_id": intent["id"],
            "points_redeemed": points_discount
        }

    except stripe.error.StripeError as e:
        # Handle Stripe-specific errors
        print(f"Stripe Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Handle other errors
        print(f"Error: {str(e)}") 
        raise HTTPException(status_code=500, detail="An error occurred while creating the payment intent")