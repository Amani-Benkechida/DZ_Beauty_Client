import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("BREVO_API_KEY")
MAIL=os.getenv("BREVO_FROM_EMAIL")

# Function to send a password reset email
def send_reset_email(email: str, reset_token: str):
    if not API_KEY:
        raise ValueError("BREVO_API_KEY is not set in the environment variables.")
    
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = API_KEY

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    subject = "Password Reset Request"
    sender = {"name": "noreply", "email":MAIL}
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
        print(f"DEBUG - Sending email to {email} with token {reset_token}")
        api_response = api_instance.send_transac_email(send_smtp_email)
        print(f"INFO - Email API Response: {api_response}")
        return api_response
    except ApiException as e:
        error_message = f"Error sending email to {email}: {e}"
        print(error_message)
        raise Exception(error_message)

