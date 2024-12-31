from sqlalchemy.orm import Session
from fastapi import Depends
from .database import SessionLocal

async def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        await db.close()
