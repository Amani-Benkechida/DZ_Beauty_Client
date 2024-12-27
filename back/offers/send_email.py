import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("BREVO_API_KEY")
MAIL=os.getenv("BREVO_FROM_EMAIL")
def send_email(email: str, discount: int):
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = API_KEY

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    subject = f"Special Offer: {discount}% Off!"
    sender = {"name": "YourApp", "email": MAIL}
    html_content = f"""
    <p>Congratulations!</p>
    <p>You've earned a special discount of {discount}% on our services.</p>
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
        print("Error details:", e.body)