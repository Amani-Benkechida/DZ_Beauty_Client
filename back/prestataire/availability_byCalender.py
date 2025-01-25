from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from sqlalchemy import text
from datetime import datetime, date as dt_date

router = APIRouter(prefix="/prestataire", tags=["PRESTATAIRE"])











@router.get("/calendar/{prestataire_id}")
async def get_calendar(prestataire_id: int, month: int, year: int, db: AsyncSession = Depends(get_db)):
    from calendar import monthrange

    # Fetch availabilities
    query_availability = text("""
        SELECT day_of_week, start_time, end_time
        FROM prestataire_availabilities
        WHERE prestataire_id = :prestataire_id
    """)
    result = await db.execute(query_availability, {"prestataire_id": prestataire_id})
    availabilities = result.mappings().fetchall()

    if not availabilities:
        return {"calendar": {}, "message": "No availability found."}

    # Fetch reservations
    query_reservations = text("""
        SELECT date, time, duration
        FROM reservations
        WHERE prestataire_id = :prestataire_id
        AND EXTRACT(MONTH FROM date) = :month
        AND EXTRACT(YEAR FROM date) = :year
    """)
    reservations_result = await db.execute(query_reservations, {"prestataire_id": prestataire_id, "month": month, "year": year})
    reservations = reservations_result.mappings().fetchall()

    # Generate calendar
    days_in_month = monthrange(year, month)[1]
    calendar = {}

    for day in range(1, days_in_month + 1):
        date = dt_date(year, month, day)
        day_of_week = date.strftime("%A").lower()

        available_slots = [
            {"start_time": slot["start_time"], "end_time": slot["end_time"]}
            for slot in availabilities if slot["day_of_week"] == day_of_week
        ]

        # Filter out unavailable times due to reservations
        for reservation in reservations:
            if reservation["date"] == date:
                reserved_time = reservation["time"]
                reserved_duration = reservation["duration"]
                reserved_end_time = (datetime.combine(date, reserved_time) + reserved_duration).time()
                available_slots = [
                    slot for slot in available_slots
                    if not (slot["start_time"] < reserved_end_time and slot["end_time"] > reserved_time)
                ]

        calendar[day] = {"available_slots": available_slots}

    return {"calendar": calendar}

