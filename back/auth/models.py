from sqlalchemy import Column, Integer, String, Text, DECIMAL, Date, Time, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from database import Base
from pydantic import BaseModel



class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    phone_number = Column(String(15), nullable=True)
    role = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())
    prestataire_profile = relationship("PrestataireProfile", back_populates="user", uselist=False)
    reset_token = Column(String, nullable=True)
    reset_token_expiry = Column(TIMESTAMP, nullable=True)
