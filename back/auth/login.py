from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.database import get_db
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv

router = APIRouter(prefix="/auth", tags=["Authentication"])
load_dotenv()

# Constants
SECRET_KEY = "SECRET_KEY"  # Replace with your secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Fetch user by email
    query = text("SELECT id, password_hash, role FROM users WHERE email = :email")
    result = await db.execute(query, {"email": request.email})
    user = result.fetchone()

    if not user or not bcrypt.checkpw(request.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate JWT token
    expiration = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode(
        {"sub": str(user.id), "exp": expiration},  # Convert user.id to string
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return {"message": "Login successful", "token": token, "role": user.role}


