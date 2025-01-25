from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from pydantic import BaseModel
from datetime import date, time

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
        orm_mode = True  # Tells Pydantic to treat SQLAlchemy models as dictionaries

async def get_all_reservations(session: AsyncSession):
    query = text("""
    SELECT 
        r.id,
        r.client_id,
        r.prestataire_id,
        r.service_id,
        r.date,
        r.time,
        r.status,
        r.total_price
    FROM 
        reservations r
    """)

    result = await session.execute(query)
    reservations = result.fetchall()

    formatted_reservations = [
        {
            'id': row[0],
            'client_id': row[1],
            'prestataire_id': row[2],
            'service_id': row[3],
            'date': row[4],
            'time': row[5],
            'status': row[6],
            'total_price': row[7]
        }
        for row in reservations
    ]

    return formatted_reservations
