from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import APIRouter, HTTPException
from aiosmtplib import send
from email.message import EmailMessage
from sqlalchemy import text
from setup.database import engine
import os  # Pour accéder aux variables d'environnement
from dotenv import load_dotenv  # Pour charger les variables d'environnement depuis un fichier .env


load_dotenv()

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


router = APIRouter(prefix="/special-offer", tags=["SpecialOffer"])


# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = 587
SMTP_EMAIL =  os.getenv("SMTP_EMAIL")
SMTP_PASSWORD =os.getenv("SMTP_PASSWORD")

# Map points to discounts
DISCOUNT_THRESHOLDS = {
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    60: 60,
    70: 70,
    80: 80,
    90: 90,
    100: 100,
    # Add more thresholds as needed
}


async def send_email(to_email: str, discount: int):
    """Send email with discount offer."""
    subject = f"Special Offer: {discount}% Off!"
    body = f"Congratulations! You've earned a special discount of {discount}% on our services."
    msg = EmailMessage()
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    await send(msg, hostname=SMTP_SERVER, port=SMTP_PORT, username=SMTP_EMAIL, password=SMTP_PASSWORD)


async def send_special_offers():
    """Check loyalty points and send offers."""
    try:
        logger.info("Starting to check loyalty points.")
        async with engine.connect() as conn: 
            # Get users with points matching thresholds
            result = await conn.execute(text(
                """
                SELECT lp.client_id, u.email, lp.points 
                FROM loyalty_program lp
                JOIN users u ON lp.client_id = u.id
                WHERE lp.points >= 10
                """
            ))
            users = result.fetchall()
            logger.info(f"Found users: {users}")
            for user in users:
                client_id, email, points = user
                # Determine the discount for the points
                discount = max([d for p, d in DISCOUNT_THRESHOLDS.items() if points >= p], default=0)
                logger.info(f"User  {email} has {points} points, discount: {discount}")
                if discount:
                    # Send the email
                    await send_email(email, discount)

                    # Update points to avoid resending
                    await conn.execute(text(
                        "UPDATE loyalty_program SET points = points - :threshold WHERE client_id = :client_id",
                        {"threshold": discount, "client_id": client_id},
                    ))
                    await conn.commit()
                    logger.info(f"Sent email to {email} with {discount}% discount.")
    except Exception as e:
        logger.error(f"Error in send_special_offers: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/check-loyalty")
async def manual_check_loyalty():
    """Manually trigger sending offers."""
    await send_special_offers()
    return {"status": "Offers sent if applicable!"}
