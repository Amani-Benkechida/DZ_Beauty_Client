from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.database import get_db

router = APIRouter(prefix="/prestataire", tags=["PRESTATAIRE"])

@router.get("/available-days/{prestataire_id}")
async def get_available_days(prestataire_id: int, db: AsyncSession = Depends(get_db)):
    query = text("""
        SELECT day_of_week, start_time, end_time
        FROM prestataire_availabilities
        WHERE prestataire_id = :prestataire_id
        ORDER BY CASE
            WHEN day_of_week = 'monday' THEN 1
            WHEN day_of_week = 'tuesday' THEN 2
            WHEN day_of_week = 'wednesday' THEN 3
            WHEN day_of_week = 'thursday' THEN 4
            WHEN day_of_week = 'friday' THEN 5
            WHEN day_of_week = 'saturday' THEN 6
            WHEN day_of_week = 'sunday' THEN 7
        END
    """)
    result = await db.execute(query, {"prestataire_id": prestataire_id})
    availabilities = result.mappings().fetchall()

    if not availabilities:
        return {"message": "No availability found for this prestataire."}

    return {"available_days": [{"day_of_week": slot["day_of_week"], "start_time": slot["start_time"], "end_time": slot["end_time"]} for slot in availabilities]}

