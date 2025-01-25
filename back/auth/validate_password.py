from fastapi import APIRouter, Depends, HTTPException, status,Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.database import get_db
from datetime import datetime
import bcrypt
router = APIRouter(prefix="/auth", tags=["Authentication"])

class ResetTokenValidate(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str
@router.post("/validate-reset-token")
async def validate_reset_token(request: ResetTokenValidate, db: AsyncSession = Depends(get_db)):
    # Debug: Print the email being searched for
    print(f"Searching for email: {request.email}")
    
    # Fetch user details with case-insensitive email search
    result = await db.execute(
        text(
            """
            SELECT id, reset_token, reset_token_expiry
            FROM users
            WHERE LOWER(email) = LOWER(:email)
            """
        ),
        {"email": request.email}
    )
    user = result.fetchone()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    # Debug: Print the fetched user data
    print(f"Fetched user data: {user}")
    
    # Check if reset_token or reset_token_expiry is None or empty
    if not user.reset_token or not user.reset_token_expiry:
        raise HTTPException(status_code=400, detail="No reset token or expiry found")

    # Debug logs for token and expiry time
    print(f"User token: {user.reset_token}, Expiry: {user.reset_token_expiry}, Provided token: {request.reset_token}")
    
    # Validate reset token and expiry
    if user.reset_token != request.reset_token or datetime.utcnow() > user.reset_token_expiry:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")

    # Hash the new password and update the user
    new_password_hash = bcrypt.hashpw(request.new_password.encode(), bcrypt.gensalt()).decode()
    await db.execute(
        text(
            """
            UPDATE users
            SET password_hash = :password_hash, reset_token = NULL, reset_token_expiry = NULL
            WHERE email = :email
            """
        ),
        {"password_hash": new_password_hash, "email": request.email}
    )
    await db.commit()
    return {"message": "Password updated successfully"}
