from sqlalchemy import Column, Integer, String, Text, DECIMAL, Date, Time, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from pydantic import BaseModel
from setup.database import Base
from typing import List
from sqlalchemy import text

from pydantic import BaseModel, EmailStr

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

# SQLAlchemy model for the PrestataireProfile table
class PrestataireProfile(Base):
    __tablename__ = "prestataire_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    portfolio = Column(Text, nullable=True)
    specializations = Column(Text, nullable=True)
    rating = Column(DECIMAL(3, 2), default=0)
    reviews_count = Column(Integer, default=0)
    
    user = relationship("User", back_populates="prestataire_profile")
    availabilities = relationship("PrestataireAvailability", back_populates="prestataire_profile", cascade="all, delete-orphan")

# SQLAlchemy model for the PrestataireAvailability table
class PrestataireAvailability(Base):
    __tablename__ = "prestataire_availabilities"
    
    id = Column(Integer, primary_key=True, index=True)
    prestataire_id = Column(Integer, ForeignKey("prestataire_profiles.id"), nullable=False)
    day_of_week = Column(String(10), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    
    prestataire_profile = relationship("PrestataireProfile", back_populates="availabilities")

# Pydantic model for availability information
class Availability(BaseModel):
    day_of_week: str
    start_time: str  # Time in string format like "HH:MM"
    end_time: str    # Time in string format like "HH:MM"

# Pydantic model for creating a new prestataire
class CreatePrestataireRequest(BaseModel):
    name: str
    email: EmailStr 
    password: str
    phone_number: str
    portfolio: str
    specializations: str
    availabilities: List[Availability]  # A list of availabilities

# Function to create tables asynchronously
async def create_tables(engine):
    async with engine.begin() as conn:
        # Create the users table if it does not exist
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            phone_number VARCHAR(15),
            role VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            reset_token TEXT,
            reset_token_expiry TIMESTAMP
        );
        """))

        # Create the prestataire_profiles table if it does not exist
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS prestataire_profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            portfolio TEXT,
            specializations TEXT,
            rating DECIMAL(3, 2) DEFAULT 0,
            reviews_count INTEGER DEFAULT 0
        );
        """))

        # Create the prestataire_availabilities table if it does not exist
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS prestataire_availabilities (
            id SERIAL PRIMARY KEY,
            prestataire_id INTEGER REFERENCES prestataire_profiles(id) ON DELETE CASCADE,
            day_of_week VARCHAR(10) NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL
        );
        """))

        # Create the reservations table if it does not exist
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS reservations (
            id SERIAL PRIMARY KEY,
            client_id INTEGER NOT NULL,
            prestataire_id INTEGER NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            status VARCHAR(50) DEFAULT 'pending' NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """))


