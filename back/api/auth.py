from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import User
from email_service import send_reset_email
from datetime import datetime, timedelta
import bcrypt
import secrets
from deps import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ResetRequest(BaseModel):
    email: EmailStr

class ResetTokenValidate(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str



@router.post("/register")
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    hashed_password = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt()).decode()
    new_user = User(email=request.email, password_hash=hashed_password)
    db.add(new_user)
    try:
        await db.commit()
        return {"message": "User registered successfully."}
    except:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists.")

@router.post("/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == request.email))
    user = result.scalars().first()
    if not user or not bcrypt.checkpw(request.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}

@router.post("/reset-password")
async def reset_password(request: ResetRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == request.email))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    reset_token = secrets.token_hex(16)
    user.reset_token = reset_token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
    await db.commit()
    send_reset_email(user.email, reset_token)
    return {"message": "Password reset email sent"}

@router.post("/validate-reset-token")
async def validate_reset_token(request: ResetTokenValidate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == request.email))
    user = result.scalars().first()
    if not user or user.reset_token != request.reset_token or datetime.utcnow() > user.reset_token_expiry:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    user.password_hash = bcrypt.hashpw(request.new_password.encode(), bcrypt.gensalt()).decode()
    user.reset_token = None
    user.reset_token_expiry = None
    await db.commit()
    return {"message": "Password updated successfully"}

