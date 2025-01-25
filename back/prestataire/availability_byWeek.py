from fastapi import APIRouter, Depends, HTTPException, status,Query
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from datetime import datetime, timedelta,time
from sqlalchemy import text

router = APIRouter(prefix="/prestataire", tags=["PRESTATAIRE"])
@router.get("/availability/{prestataire_id}/{day_of_week}")
async def check_availability(
    prestataire_id: int,
    day_of_week: str,
    time: str = Query(None, regex="^(?:[01]\\d|2[0-3]):[0-5]\\d$"),
    db: AsyncSession = Depends(get_db)
):
    # Validate day_of_week
    day_of_week = day_of_week.lower()
    valid_days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    if day_of_week not in valid_days:
        raise HTTPException(status_code=400, detail=f"Invalid day_of_week. Expected one of: {', '.join(valid_days)}")

    # Query availability using raw SQL
    query = text("""
        SELECT start_time, end_time 
        FROM prestataire_availabilities 
        WHERE prestataire_id = :prestataire_id 
        AND day_of_week = :day_of_week
    """)
    result = await db.execute(query, {"prestataire_id": prestataire_id, "day_of_week": day_of_week})
    availabilities = result.mappings().fetchall()  # This returns rows as dictionaries

    if not availabilities:
        return {"available_slots": [], "message": "No availability found for this prestataire on the selected day"}

    # Process available slots (access by column names)
    available_slots = [{"start_time": slot["start_time"], "end_time": slot["end_time"]} for slot in availabilities]

    # If a specific time is provided, check it
    if time:
        requested_time = datetime.strptime(time, "%H:%M").time()
        for slot in available_slots:
            if slot["start_time"] <= requested_time <= slot["end_time"]:
                return {"available": True, "message": "Available", "slot": slot}
        return {"available": False, "message": "Not available at the requested time"}

    return {"available_slots": available_slots}