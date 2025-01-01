from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from setup.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Optional
from datetime import datetime, date, time
from review.review import router as reviews_router
from offers.loyality import router as loyality_router
from offers.specialOffer import router as spacialOffer_router
from offers.specialOffer import send_special_offers
from setup.deps import get_db
from apscheduler.schedulers.background import BackgroundScheduler
from reservation.payment import router as payment_router
from reservation.cancel_reservation import cancel_reservation
from reservation.get_all_reservations import get_all_reservations
from prestataire_service.add_prestataire_service import add_prestataire_to_service

# Initialize FastAPI Application
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



scheduler = BackgroundScheduler()
@app.on_event("startup")
async def startup_event():
    scheduler.add_job(send_special_offers, "interval", hours=24)
    scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    scheduler.shutdown()

@app.get("/")
async def get_all_reservations_route(db: AsyncSession = Depends(get_db)):
    reservations = await get_all_reservations(db)
    return reservations

@app.post("/cancel/{reservation_id}")
async def cancel_reservation_route(reservation_id: int, db: AsyncSession = Depends(get_db)):
    result = await cancel_reservation(reservation_id, db)
    return result

@app.post("/add-prestataire-to-service/")
async def add_prestataire_to_service_route(prestataire_id: int,service_id: int,db: AsyncSession = Depends(get_db)):
    result = await add_prestataire_to_service(prestataire_id, service_id, db)
    return result




# Register Routers
app.include_router(reviews_router)
app.include_router(loyality_router)
app.include_router(spacialOffer_router)
app.include_router(payment_router)


