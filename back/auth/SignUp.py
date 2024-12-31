from fastapi import APIRouter, Depends, HTTPException, status,Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from setup.database import get_db

import bcrypt
import secrets
from datetime import datetime as dt_datetime, date as dt_date

from datetime import datetime, timedelta,time
from sqlalchemy import text


from passlib.context import CryptContext
 
import logging
logging.basicConfig(level=logging.INFO)  # Set the log level to INFO
logger = logging.getLogger(__name__) 

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Pydantic models
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "client"
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

