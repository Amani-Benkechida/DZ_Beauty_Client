from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.database import get_db
import secrets 
from fastapi import Depends, HTTPException,APIRouter
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from .email_service import send_reset_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

class ResetRequest(BaseModel):
    email: EmailStr


@router.post("/reset-password")
async def reset_password(request: ResetRequest, db: AsyncSession = Depends(get_db)):
    try:
        # Check if user exists
        result = await db.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": request.email}
        )
        user = result.fetchone()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Generate reset token and update user
        reset_token = secrets.token_hex(16)
        expiry_time = datetime.utcnow() + timedelta(hours=1)
        await db.execute(
            text(
                """
                UPDATE users
                SET reset_token = :reset_token, reset_token_expiry = :reset_token_expiry
                WHERE email = :email
                """
            ),
            {
                "reset_token": reset_token,
                "reset_token_expiry": expiry_time,
                "email": request.email,
            }
        )
        await db.commit()

        # Send reset email
        send_reset_email(request.email, reset_token)

        return {"message": "Password reset email sent."}
    except Exception as e:
        # Log the exception details for debugging
        print(f"ERROR - Failed to process reset-password request: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")