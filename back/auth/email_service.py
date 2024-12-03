import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("BREVO_API_KEY")

def send_reset_email(email: str, reset_token: str):
    sib_api_v3_sdk.configuration.api_key['api-key'] = API_KEY
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi()

    subject = "Password Reset Request"
    sender = {"name": "YourApp", "email": "no-reply@yourapp.com"}
    html_content = f"""
    <p>Hi,</p>
    <p>You requested a password reset. Use the token below:</p>
    <p><strong>{reset_token}</strong></p>
    <p>If you didn't request this, ignore this email.</p>
    """

    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": email}],
        subject=subject,
        sender=sender,
        html_content=html_content,
    )

    try:
        api_instance.send_transac_email(send_smtp_email)
        print("Email sent successfully!")
    except ApiException as e:
        print("Error sending email:", e)
