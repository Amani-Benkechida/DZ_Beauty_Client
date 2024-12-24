from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from setup.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Optional
from datetime import datetime, date, time
from auth.auth import router as auth_router
from review.review import router as reviews_router
from offers.loyality import router as loyality_router
from offers.specialOffer import router as spacialOffer_router
from offers.specialOffer import send_special_offers
from setup.deps import get_db
from apscheduler.schedulers.background import BackgroundScheduler
from reservation.payment import router as payment_router


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



# Register Routers

app.include_router(auth_router)
app.include_router(reviews_router)
app.include_router(loyality_router)
app.include_router(spacialOffer_router)
app.include_router(payment_router)
