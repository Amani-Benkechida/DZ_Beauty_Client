from fastapi import APIRouter, Depends, HTTPException, status,Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.database import get_db
import bcrypt

router = APIRouter(prefix="/auth", tags=["Authentication"])




class LoginRequest(BaseModel):
    email: EmailStr
    password: str



@router.post("/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Fetch user by email
    query = text("SELECT password_hash, role FROM users WHERE email = :email")
    result = await db.execute(query, {"email": request.email})
    user = result.fetchone()
    if not user or not bcrypt.checkpw(request.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "role": user.role}