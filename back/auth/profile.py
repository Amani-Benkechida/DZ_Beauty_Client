from fastapi import  Depends, HTTPException,APIRouter

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from jose import jwt, JWTError
from dotenv import load_dotenv
from setup.database import get_db
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

router = APIRouter(prefix="/profile", tags=["profile"])
load_dotenv()
SECRET_KEY = "SECRET_KEY"  # Replace with your secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = int(payload.get("sub"))
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/profile")
async def get_profile(current_user: int = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("SELECT name, email, phone_number FROM users WHERE id = :user_id")
    result = await db.execute(query, {"user_id": current_user})
    user = result.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": user.name,
        "email": user.email,
        "phone_number": user.phone_number,
    }

@router.put("/profile")
async def update_profile(profile_data: dict, current_user: int = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE users 
        SET name = :name, email = :email, phone_number = :phone_number 
        WHERE id = :user_id
    """)
    await db.execute(query, {**profile_data, "user_id": current_user})
    await db.commit()
    return {"message": "Profile updated successfully"}
