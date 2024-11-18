from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configuration for PostgreSQL database
DATABASE_URL = os.getenv('DATABASE_URL') 
SECRET_KEY = os.getenv('AUTH_SECRET_KEY')
ALGORITHM = os.getenv('AUTH_ALGORITHM')

# Database connection and session setup
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as db:
        yield db

db_dependency = Annotated[AsyncSession, Depends(get_db)]

# Password hashing configuration
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

# OAuth2 bearer token dependency
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')
oauth2_bearer_dependency = Annotated[str, Depends(oauth2_bearer)]

# Authentication utility to retrieve the current user
async def get_current_user(token: oauth2_bearer_dependency):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if username is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Could not validate user'
            )
        return {'username': username, 'id': user_id}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate user'
        )

user_dependency = Annotated[dict, Depends(get_current_user)]
