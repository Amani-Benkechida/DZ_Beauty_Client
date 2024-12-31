from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from setup.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Optional
from datetime import datetime,date,time
from auth.SignUp import router as auth_router
from auth.profile import router as client_profile
from auth.login import router as login_router
from auth.reset_password import router as reset_router
from auth.validate_password import router as validate_router
from reservation.reservations import router as reservations
from prestataire.availability_byCalender import router as calender
from prestataire.availability_byWeek import router as week
from prestataire.prestataire_profile import router as prestataire_profile
from prestataire.update_prestataire_availability import router as update_prestataire

from sqlalchemy.exc import IntegrityError

from fastapi.middleware.cors import CORSMiddleware
from review.review import router as reviews_router
from offers.loyality import router as loyality_router
from offers.specialOffer import router as spacialOffer_router
from offers.specialOffer import send_special_offers

from apscheduler.schedulers.background import BackgroundScheduler
from reservation.payment import router as payment_router


# Initialize FastAPI Application
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello, World"}

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Include authentication routes
app.include_router(auth_router)
app.include_router(client_profile)
app.include_router(login_router)
app.include_router(reset_router)
app.include_router(validate_router)
app.include_router(reservations)
app.include_router(calender)
app.include_router(week)
app.include_router(prestataire_profile)
app.include_router(update_prestataire)
#app.include_router(availability_router, prefix="/availability", tags=["Availability"])
#app.include_router(reservation_router, prefix="/reservation", tags=["Reservation"])
#app.include_router(payment_router, prefix="/payment", tags=["Payment"])

app.include_router(reviews_router)
app.include_router(loyality_router)
app.include_router(spacialOffer_router)
app.include_router(payment_router)

