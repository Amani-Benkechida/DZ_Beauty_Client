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
from reservation.get_all_reservations import get_all_reservations
from reservation.current_user import router as current_user
from sqlalchemy.exc import IntegrityError

from fastapi.middleware.cors import CORSMiddleware
from review.review import router as reviews_router
from offers.loyality import router as loyality_router
from offers.specialOffer import router as spacialOffer_router
from offers.specialOffer import send_special_offers

from apscheduler.schedulers.background import BackgroundScheduler
from reservation.payment import router as payment_router
from prestataire.add_prestataire_service import add_prestataire_to_service
from prestataire.get_prestataire import get_all_prestataires_by_service
from prestataire.get_prestataire import get_user
from sqlalchemy.orm import Session
from reservation.get_all_reservations import get_all_reservations
from prestataire.get_prestataire import get_prestataire_profile
from prestataire.get_prestataire import get_all_services
from prestataire.prestataireavabily import router as prestataire
from prestataire.get_prestataire import get_reservations_by_user


    




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
async def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        await db.close()

@app.get("/prestataire")
async def get_all_prestataires_by_service_route(service_id: int ,db: AsyncSession = Depends(get_db)):

   

    result = await get_all_prestataires_by_service(service_id,db)
    return result
@app.post("/add-prestataire-to-service/")
async def add_prestataire_to_service_route(prestataire_id: int,service_id: int,db: AsyncSession = Depends(get_db)):
    result = await add_prestataire_to_service(prestataire_id, service_id, db)
    return result



class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str
    role: str
    created_at: str

    class Config:
        orm_mode = True    
@app.get("/{user_id}", response_model=UserResponse)   
async def get_user_route(user_id: int, db: AsyncSession = Depends(get_db)):
    user = await get_user(user_id, db)
    return user


class ServiceResponse(BaseModel):
    id: int
    name: str
    description: str
    base_price: float

    class Config:
        orm_mode = True

@app.get("/servicetable", response_model=List[ServiceResponse])
async def get_service_table_route(db: AsyncSession = Depends(get_db)):
    services = await get_all_services(db)
    return services








class ReservationResponse(BaseModel):
    id: int
    client_id: int
    prestataire_id: int
    service_id: int
    date: date
    time: time
    status: str
    total_price: float

    class Config:
        orm_mode = True
@app.get("/reservations")
async def get_all_reservations_route(db: AsyncSession = Depends(get_db)):
    reservations = await get_all_reservations(db)
    return reservations


@app.get("/prf/{profile_id}")
async def  get_prestataire_profile_route(profile_id: int, db: AsyncSession = Depends(get_db)):
    profile = await  get_prestataire_profile(profile_id, db)
    return profile
@app.get("/prf/{profile_id}")
async def  get_prestataire_profile_route(profile_id: int, db: AsyncSession = Depends(get_db)):
    profile = await  get_prestataire_profile(profile_id, db)
    return profile
@app.get("/userres/{user_id}", response_model=List[ReservationResponse])
async def get_reservations_by_user_route_route(user_id: int, db: AsyncSession = Depends(get_db)):
    reservations = await get_reservations_by_user(user_id, db)
    return reservations
  

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
app.include_router(current_user) 
app.include_router(prestataire)

#app.include_router(availability_router, prefix="/availability", tags=["Availability"])
#app.include_router(reservation_router, prefix="/reservation", tags=["Reservation"])
#app.include_router(payment_router, prefix="/payment", tags=["Payment"])

app.include_router(reviews_router)
app.include_router(loyality_router)
app.include_router(spacialOffer_router)
app.include_router(payment_router)



