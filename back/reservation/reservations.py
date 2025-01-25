from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from datetime import datetime, timedelta
from datetime import datetime as dt_datetime
from jose import jwt
from setup.database import get_db
from dotenv import load_dotenv
router = APIRouter(prefix="/reservation", tags=["RESERVATION"])
load_dotenv()

# Constants
SECRET_KEY = "SECRET_KEY"  # Replace with your secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
security = HTTPBearer()

# Function to extract current user from the token
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security), 
    db: AsyncSession = Depends(get_db)
):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    query = text("SELECT id, role FROM users WHERE id = :id")
    result = await db.execute(query, {"id": user_id})
    user = result.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"id": user.id, "role": user.role}

@router.post("/reserve")
async def create_reservation(
    services: list,  # List of dictionaries containing service_id, date, start_time, end_time, total_price
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    client_id = current_user["id"]
    reservation_ids = []
    total_price = 0

    for service in services:
        service_id = service["service_id"]
        date = service["date"]
        start_time = service["start_time"]
        end_time = service["end_time"]
        service_price = service["total_price"]

        total_price += service_price
        reservation_date = dt_datetime.strptime(date, "%Y-%m-%d").date()
        start_time_obj = dt_datetime.strptime(start_time, "%H:%M").time()
        end_time_obj = dt_datetime.strptime(end_time, "%H:%M").time()

        if (datetime.combine(reservation_date, end_time_obj) - datetime.combine(reservation_date, start_time_obj)).seconds != 3600:
            raise HTTPException(status_code=400, detail="The reservation duration must be exactly 1 hour.")

        day_of_week = reservation_date.strftime("%A").lower()

        check_reservations_query = text("""
            SELECT time, end_time
            FROM reservations
            WHERE prestataire_id = :prestataire_id AND date = :date
        """)
        result = await db.execute(check_reservations_query, {"prestataire_id": service["prestataire_id"], "date": reservation_date})
        reservations = result.mappings().fetchall()

        for reservation in reservations:
            reserved_start_time = reservation["time"]
            reserved_end_time = reservation["end_time"]
            if reserved_start_time < end_time_obj and reserved_end_time > start_time_obj:
                raise HTTPException(status_code=400, detail="The time slot is already reserved.")

        insert_reservation_query = text("""
            INSERT INTO reservations (client_id, prestataire_id, service_id, date, time, end_time, total_price)
            VALUES (:client_id, :prestataire_id, :service_id, :date, :start_time, :end_time, :total_price)
            RETURNING id
        """)
        result = await db.execute(insert_reservation_query, {
            "client_id": client_id,
            "prestataire_id": service["prestataire_id"],
            "service_id": service_id,
            "date": reservation_date,
            "start_time": start_time_obj,
            "end_time": end_time_obj,
            "total_price": service_price
        })
        reservation_id = result.fetchone()[0]
        reservation_ids.append(reservation_id)

    await db.commit()
    return {"reservation_ids": reservation_ids, "total_price": total_price}
