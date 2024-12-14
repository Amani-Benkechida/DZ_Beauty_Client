from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from database import get_db
from email_service import send_reset_email
from datetime import datetime, timedelta
import bcrypt
import secrets

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Pydantic models
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "client"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ResetRequest(BaseModel):
    email: EmailStr

class ResetTokenValidate(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str

# Register route
@router.post("/register")
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if email already exists
    check_query = text("SELECT id FROM users WHERE email = :email")
    existing_user = await db.execute(check_query, {"email": request.email})
    if existing_user.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists.")
    
    # Hash the password and insert the user
    hashed_password = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt()).decode()
    insert_query = text("""
        INSERT INTO users (name, email, password_hash, role)
        VALUES (:name, :email, :password_hash, :role)
    """)
    try:
        await db.execute(insert_query, {
            "name": request.name,
            "email": request.email,
            "password_hash": hashed_password,
            "role": request.role,
        })
        await db.commit()
        return {"message": "User registered successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Login route
@router.post("/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Fetch user by email
    query = text("SELECT password_hash, role FROM users WHERE email = :email")
    result = await db.execute(query, {"email": request.email})
    user = result.fetchone()
    if not user or not bcrypt.checkpw(request.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "role": user.role}

# Reset password route
@router.post("/reset-password")
async def reset_password(request: ResetRequest, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    select_query = text("SELECT id FROM users WHERE email = :email")
    result = await db.execute(select_query, {"email": request.email})
    user = result.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate reset token and update user
    reset_token = secrets.token_hex(16)
    expiry_time = datetime.utcnow() + timedelta(hours=1)
    update_query = text("""
        UPDATE users
        SET reset_token = :reset_token, reset_token_expiry = :reset_token_expiry
        WHERE email = :email
    """)
    await db.execute(update_query, {
        "reset_token": reset_token,
        "reset_token_expiry": expiry_time,
        "email": request.email
    })
    await db.commit()

    # Send reset email
    send_reset_email(request.email, reset_token)
    return {"message": "Password reset email sent"}

# Validate reset token and set new password
@router.post("/validate-reset-token")
async def validate_reset_token(request: ResetTokenValidate, db: AsyncSession = Depends(get_db)):
    # Fetch user details
    select_query = text("""
        SELECT id, reset_token, reset_token_expiry
        FROM users
        WHERE email = :email
    """)
    result = await db.execute(select_query, {"email": request.email})
    user = result.fetchone()
    if not user or user.reset_token != request.reset_token or datetime.utcnow() > user.reset_token_expiry:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Hash the new password and update the user
    new_password_hash = bcrypt.hashpw(request.new_password.encode(), bcrypt.gensalt()).decode()
    update_query = text("""
        UPDATE users
        SET password_hash = :password_hash, reset_token = NULL, reset_token_expiry = NULL
        WHERE email = :email
    """)
    await db.execute(update_query, {"password_hash": new_password_hash, "email": request.email})
    await db.commit()
    return {"message": "Password updated successfully"}
