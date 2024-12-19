from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Optional
from datetime import datetime,date,time
from routes import router as auth_router



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




# Include authentication routes
app.include_router(auth_router)
#app.include_router(availability_router, prefix="/availability", tags=["Availability"])
#app.include_router(reservation_router, prefix="/reservation", tags=["Reservation"])
#app.include_router(payment_router, prefix="/payment", tags=["Payment"])