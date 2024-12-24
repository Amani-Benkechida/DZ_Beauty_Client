from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from setup.database import engine
from .send_email import send_email  
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/special-offer", tags=["SpecialOffer"])

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
}

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
                discount = max(
                    [d for p, d in DISCOUNT_THRESHOLDS.items() if points >= p], default=0)
                logger.info(f"User  {email} has {points} points, discount: {discount}")
                if discount:
                    # Send the email using Brevo
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