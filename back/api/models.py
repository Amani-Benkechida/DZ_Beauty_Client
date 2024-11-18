from sqlalchemy import Column, Integer, String, Text, DECIMAL, Date, Time, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    phone_number = Column(String(15), nullable=True)
    role = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    base_price = Column(DECIMAL(10, 2), nullable=False)

class PrestataireProfile(Base):
    __tablename__ = "prestataire_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    portfolio = Column(Text, nullable=True)
    specializations = Column(Text, nullable=True)
    rating = Column(DECIMAL(3, 2), default=0, nullable=True)
    reviews_count = Column(Integer, default=0)

    user = relationship("User", back_populates="prestataire_profile")

class PrestataireAvailability(Base):
    __tablename__ = "prestataire_availabilities"
    
    id = Column(Integer, primary_key=True, index=True)
    prestataire_id = Column(Integer, ForeignKey('prestataire_profiles.id'))
    day_of_week = Column(String(10), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

class Reservation(Base):
    __tablename__ = "reservations"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey('users.id'))
    prestataire_id = Column(Integer, ForeignKey('prestataire_profiles.id'))
    service_id = Column(Integer, ForeignKey('services.id'))
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    status = Column(String(50), default='pending', nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())

class LoyaltyProgram(Base):
    __tablename__ = "loyalty_program"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey('users.id'))
    points = Column(Integer, default=0)
    last_updated = Column(TIMESTAMP, default=func.now())

class SpecialOffer(Base):
    __tablename__ = "special_offers"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    discount_percentage = Column(DECIMAL(5, 2), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

class ServicePrestataire(Base):
    __tablename__ = "service_prestataires"
    
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey('services.id'))
    prestataire_id = Column(Integer, ForeignKey('prestataire_profiles.id'))

class Review(Base):
    __tablename__ = "reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey('users.id'))
    prestataire_id = Column(Integer, ForeignKey('prestataire_profiles.id'))
    rating = Column(DECIMAL(3, 2), nullable=False)
    comment = Column(Text, nullable=True)
    created_at = Column(TIMESTAMP, default=func.now())
