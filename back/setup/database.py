# auth/database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Initialize the async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Session factory (optional, for managing transactions)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

# Dependency to get the database session
async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            # Make sure to commit or rollback depending on the transaction state
            await session.commit()



