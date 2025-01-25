from typing import List
from fastapi import APIRouter, Depends, HTTPException, status,Query
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from datetime import datetime, timedelta,time
from sqlalchemy import text
from auth.models import CreatePrestataireRequest 

router = APIRouter(prefix="/prestataire", tags=["PROFILE"])

@router.put("/availability/update/{prestataire_id}")
async def update_availability(prestataire_id: int, availabilities: List[dict], db: AsyncSession = Depends(get_db)):
    # Clear existing availability
    delete_query = text("DELETE FROM prestataire_availabilities WHERE prestataire_id = :prestataire_id")
    await db.execute(delete_query, {"prestataire_id": prestataire_id})

    # Insert new availability slots
    for availability in availabilities:
        try:
            # Convert start_time and end_time from string to time objects
            start_time = datetime.strptime(availability["start_time"], "%H:%M").time()
            end_time = datetime.strptime(availability["end_time"], "%H:%M").time()

            # Insert the availability into the database
            insert_query = text("""
                INSERT INTO prestataire_availabilities (prestataire_id, day_of_week, start_time, end_time)
                VALUES (:prestataire_id, :day_of_week, :start_time, :end_time)
            """)
            await db.execute(insert_query, {
                "prestataire_id": prestataire_id,
                "day_of_week": availability["day_of_week"],
                "start_time": start_time,
                "end_time": end_time
            })
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid time format. Use HH:MM format for times.")

    await db.commit()
    return {"message": "Availability updated successfully."}