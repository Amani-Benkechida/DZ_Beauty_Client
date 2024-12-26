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




# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = 587
SMTP_EMAIL =  os.getenv("SMTP_EMAIL")
SMTP_PASSWORD =os.getenv("SMTP_PASSWORD")



async def send_confirmation_email(to_email: str, reservation_id: int):
    subject = "Reservation Confirmation"
    body = f"Your reservation with ID {reservation_id} has been confirmed. Thank you for your payment!"
    msg = EmailMessage()
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    try:
        await send(msg, hostname=SMTP_SERVER, port=SMTP_PORT, username=SMTP_EMAIL, password=SMTP_PASSWORD)
        logger.info(f"Email sent to {to_email} with reservation confirmation.")
    except Exception as e:
        logger.error(f"Error sending email: {e}")