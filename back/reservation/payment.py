from fastapi import APIRouter, HTTPException, Depends  # Pour créer le routeur et gérer les exceptions
from pydantic import BaseModel  # Pour définir le modèle de requête
import stripe  # Pour interagir avec l'API Stripe
from typing import Optional  # Pour utiliser Optional dans le modèle
from sqlalchemy.ext.asyncio import AsyncSession  # Pour la gestion des sessions asynchrones
from sqlalchemy import text  # Pour exécuter des requêtes SQL
from setup.deps import get_db  # Pour obtenir la session de base de données
import os  # Pour accéder aux variables d'environnement
from dotenv import load_dotenv  # Pour charger les variables d'environnement depuis un fichier .env


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

@router.post("/create-payment-intent")
async def create_payment_intent(payment: PaymentRequest, db: AsyncSession = Depends(get_db)):
    try:
        # Vérifier si une offre spéciale est fournie
        discount = 0
        if payment.special_offer_id:
            # Récupérer l'offre spéciale depuis la base de données
            offer_result = await db.execute(text("SELECT discount_percentage FROM special_offers WHERE id = :offer_id"),
                {"offer_id": payment.special_offer_id}
            )
            offer = offer_result.fetchone()
            if offer:
                discount = offer[0]  # Pourcentage de réduction

        # Calculer le montant après réduction
        final_amount = payment.amount - (payment.amount * discount / 100)

        # Créer un PaymentIntent avec le montant final
        intent = stripe.PaymentIntent.create(
            amount=int(final_amount),  # Montant en cents
            currency=payment.currency,
            description=payment.description,
            receipt_email=payment.receipt_email,
            payment_method_types=["card"],  # Accept card payments
        )

        return {
            "client_secret": intent["client_secret"],  # Return the client secret to the frontend
            "payment_intent_id": intent["id"]
        }

    except stripe.error.StripeError as e:
        # Handle Stripe-specific errors
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Handle other errors
        raise HTTPException(status_code=500, detail="An error occurred while creating the payment intent")