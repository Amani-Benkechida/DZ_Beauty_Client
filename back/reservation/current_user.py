from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from jose import jwt
from datetime import datetime, timedelta
from setup.database import get_db
from dotenv import load_dotenv
router = APIRouter(prefix="/users", tags=["Users"])
load_dotenv()
SECRET_KEY = "SECRET_KEY" 
ALGORITHM = "HS256"
security = HTTPBearer()


@router.get("/current-user")
async def get_current_user_route(
    credentials: HTTPAuthorizationCredentials = Depends(security), 
    db: AsyncSession = Depends(get_db)
):
    try:
        # Decode JWT token
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Fetch user from database
    query = text("SELECT id, role FROM users WHERE id = :id")
    result = await db.execute(query, {"id": user_id})
    user = result.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return user details
    return {"id": user.id, "role": user.role}
