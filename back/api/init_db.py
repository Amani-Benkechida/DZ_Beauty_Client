from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from .database import Base  
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

# Your async engine setup
engine = create_async_engine(DATABASE_URL, echo=True)

# Your async init_db function
async def init_db():
    # Create all tables using async context manager
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Run the init_db function
if __name__ == "__main__":
    import asyncio
    asyncio.run(init_db())
