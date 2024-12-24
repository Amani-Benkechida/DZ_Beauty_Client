from fastapi import APIRouter, Depends, HTTPException, status,Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from database import get_db
from email_service import send_reset_email
from datetime import datetime, timedelta
import bcrypt
import secrets
from datetime import datetime as dt_datetime, date as dt_date

from datetime import datetime, timedelta,time
from sqlalchemy import text
from sqlalchemy.future import select
from datetime import datetime, time, date as dt_date

from passlib.context import CryptContext
from typing import List
from models import CreatePrestataireRequest 
import logging
logging.basicConfig(level=logging.INFO)  # Set the log level to INFO
logger = logging.getLogger(__name__) 

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Pydantic models
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "client"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ResetRequest(BaseModel):
    email: EmailStr

class ResetTokenValidate(BaseModel):
    email: EmailStr
    reset_token: str
    new_password: str

# Register route
@router.post("/register")
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if email already exists
    check_query = text("SELECT id FROM users WHERE email = :email")
    existing_user = await db.execute(check_query, {"email": request.email})
    if existing_user.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists.")
    
    # Hash the password and insert the user
    hashed_password = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt()).decode()
    insert_query = text("""
        INSERT INTO users (name, email, password_hash, role)
        VALUES (:name, :email, :password_hash, :role)
    """)
    try:
        await db.execute(insert_query, {
            "name": request.name,
            "email": request.email,
            "password_hash": hashed_password,
            "role": request.role,
        })
        await db.commit()
        return {"message": "User registered successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Login route
@router.post("/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Fetch user by email
    query = text("SELECT password_hash, role FROM users WHERE email = :email")
    result = await db.execute(query, {"email": request.email})
    user = result.fetchone()
    if not user or not bcrypt.checkpw(request.password.encode(), user.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "role": user.role}
@router.post("/reset-password")
async def reset_password(request: ResetRequest, db: AsyncSession = Depends(get_db)):
    try:
        # Check if user exists
        result = await db.execute(
            text("SELECT id FROM users WHERE email = :email"),
            {"email": request.email}
        )
        user = result.fetchone()

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Generate reset token and update user
        reset_token = secrets.token_hex(16)
        expiry_time = datetime.utcnow() + timedelta(hours=1)
        await db.execute(
            text(
                """
                UPDATE users
                SET reset_token = :reset_token, reset_token_expiry = :reset_token_expiry
                WHERE email = :email
                """
            ),
            {
                "reset_token": reset_token,
                "reset_token_expiry": expiry_time,
                "email": request.email,
            }
        )
        await db.commit()

        # Send reset email
        send_reset_email(request.email, reset_token)

        return {"message": "Password reset email sent."}
    except Exception as e:
        # Log the exception details for debugging
        print(f"ERROR - Failed to process reset-password request: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")

@router.post("/validate-reset-token")
async def validate_reset_token(request: ResetTokenValidate, db: AsyncSession = Depends(get_db)):
    # Debug: Print the email being searched for
    print(f"Searching for email: {request.email}")
    
    # Fetch user details with case-insensitive email search
    result = await db.execute(
        text(
            """
            SELECT id, reset_token, reset_token_expiry
            FROM users
            WHERE LOWER(email) = LOWER(:email)
            """
        ),
        {"email": request.email}
    )
    user = result.fetchone()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    # Debug: Print the fetched user data
    print(f"Fetched user data: {user}")
    
    # Check if reset_token or reset_token_expiry is None or empty
    if not user.reset_token or not user.reset_token_expiry:
        raise HTTPException(status_code=400, detail="No reset token or expiry found")

    # Debug logs for token and expiry time
    print(f"User token: {user.reset_token}, Expiry: {user.reset_token_expiry}, Provided token: {request.reset_token}")
    
    # Validate reset token and expiry
    if user.reset_token != request.reset_token or datetime.utcnow() > user.reset_token_expiry:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")

    # Hash the new password and update the user
    new_password_hash = bcrypt.hashpw(request.new_password.encode(), bcrypt.gensalt()).decode()
    await db.execute(
        text(
            """
            UPDATE users
            SET password_hash = :password_hash, reset_token = NULL, reset_token_expiry = NULL
            WHERE email = :email
            """
        ),
        {"password_hash": new_password_hash, "email": request.email}
    )
    await db.commit()
    return {"message": "Password updated successfully"}
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
@router.post("/reserve")
async def create_reservation(
    client_id: int,
    prestataire_id: int,
    service_id: int,
    date: str,  # YYYY-MM-DD
    start_time: str,  # HH:MM (Start time of the reservation)
    end_time: str,    # HH:MM (End time of the reservation)
    total_price: float,
    db: AsyncSession = Depends(get_db)
):
    # Convert inputs to datetime
    reservation_date = dt_datetime.strptime(date, "%Y-%m-%d").date()
    start_time_obj = dt_datetime.strptime(start_time, "%H:%M").time()
    end_time_obj = dt_datetime.strptime(end_time, "%H:%M").time()

    # Ensure the reservation duration is 1 hour
    if (datetime.combine(reservation_date, end_time_obj) - datetime.combine(reservation_date, start_time_obj)).seconds != 3600:
        raise HTTPException(status_code=400, detail="The reservation duration must be exactly 1 hour.")

    # Determine the day of the week (e.g., "monday", "tuesday", etc.)
    day_of_week = reservation_date.strftime("%A").lower()  # "monday", "tuesday", etc.

    # Check for overlapping reservations (Check availability first)
    check_reservations_query = text("""
        SELECT time, end_time
        FROM reservations
        WHERE prestataire_id = :prestataire_id AND date = :date
    """)
    result = await db.execute(check_reservations_query, {"prestataire_id": prestataire_id, "date": reservation_date})
    reservations = result.mappings().fetchall()

    for reservation in reservations:
        reserved_start_time = reservation["time"]
        reserved_end_time = reservation["end_time"]
        if reserved_start_time < end_time_obj and reserved_end_time > start_time_obj:
            raise HTTPException(status_code=400, detail="The time slot is already reserved.")

    # Insert the reservation
    insert_reservation_query = text("""
        INSERT INTO reservations (client_id, prestataire_id, service_id, date, time, end_time, total_price, status)
        VALUES (:client_id, :prestataire_id, :service_id, :date, :start_time, :end_time, :total_price, 'pending')
        RETURNING id
    """)
    result = await db.execute(insert_reservation_query, {
        "client_id": client_id,
        "prestataire_id": prestataire_id,
        "service_id": service_id,
        "date": reservation_date,
        "start_time": start_time_obj,
        "end_time": end_time_obj,
        "total_price": total_price
    })
    reservation_id = result.fetchone()[0]

    # Update the availability after reservation (remove only the reserved time)
    # Here, you'll need to query the availability slots based on `day_of_week`
    query_availability = text("""
        SELECT start_time, end_time
        FROM prestataire_availabilities
        WHERE prestataire_id = :prestataire_id AND day_of_week = :day_of_week
    """)
    result = await db.execute(query_availability, {"prestataire_id": prestataire_id, "day_of_week": day_of_week})
    available_slots = result.mappings().fetchall()

    for slot in available_slots:
        slot_start_time = slot["start_time"]
        slot_end_time = slot["end_time"]

        # If the reserved time is within the available slot, split the availability
        if slot_start_time < start_time_obj < slot_end_time:
            # Update the availability to reflect only the portion before the reserved time
            update_availability_query = text("""
                UPDATE prestataire_availabilities
                SET end_time = :start_time
                WHERE prestataire_id = :prestataire_id
                AND day_of_week = :day_of_week
                AND start_time = :start_time
            """)
            await db.execute(update_availability_query, {
                "prestataire_id": prestataire_id,
                "day_of_week": day_of_week,
                "start_time": slot_start_time,
                "start_time": start_time_obj
            })

            # Insert a new availability slot for the time after the reserved time
            new_start_time = (datetime.combine(reservation_date, start_time_obj) + timedelta(hours=1)).time()
            if new_start_time < slot_end_time:
                insert_availability_query = text("""
                    INSERT INTO prestataire_availabilities (prestataire_id, day_of_week, start_time, end_time)
                    VALUES (:prestataire_id, :day_of_week, :start_time, :end_time)
                """)
                await db.execute(insert_availability_query, {
                    "prestataire_id": prestataire_id,
                    "day_of_week": day_of_week,
                    "start_time": new_start_time,
                    "end_time": slot_end_time
                })

    await db.commit()
    return {"reservation_id": reservation_id}

@router.post("/create")
async def create_prestataire(request: CreatePrestataireRequest, db: AsyncSession = Depends(get_db)):
    # Step 1: Check if the email already exists
    existing_user_query = text("SELECT id FROM users WHERE email = :email")
    existing_user = await db.execute(existing_user_query, {"email": request.email})
    if existing_user.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists.")

    # Step 2: Hash the password
    hashed_password = bcrypt.hashpw(request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Step 3: Insert new user
    insert_user_query = text("""
        INSERT INTO users (name, email, password_hash, phone_number, role)
        VALUES (:name, :email, :password_hash, :phone_number, 'prestataire')
        RETURNING id
    """)
    result = await db.execute(insert_user_query, {
        "name": request.name,
        "email": request.email,
        "password_hash": hashed_password,
        "phone_number": request.phone_number
    })
    user_id = result.fetchone()[0]

    # Step 4: Insert prestataire profile
    insert_profile_query = text("""
        INSERT INTO prestataire_profiles (user_id, portfolio, specializations, rating, reviews_count)
        VALUES (:user_id, :portfolio, :specializations, 0, 0)
        RETURNING id
    """)
    result = await db.execute(insert_profile_query, {
        "user_id": user_id,
        "portfolio": request.portfolio,
        "specializations": request.specializations
    })
    prestataire_id = result.fetchone()[0]

    # Step 5: Insert availability slots for the entire week
    if request.availabilities:
        for availability in request.availabilities:
            # Convert the times to datetime objects for comparison
            start_time = datetime.strptime(availability.start_time, "%H:%M").time()
            end_time = datetime.strptime(availability.end_time, "%H:%M").time()

            # Skip inserting availability for days they don't work
            if availability.day_of_week.lower() == "no availability":
                continue

            # Check for overlapping slots for the day of the week
            overlap_query = text("""
                SELECT * FROM prestataire_availabilities
                WHERE prestataire_id = :prestataire_id
                AND day_of_week = :day_of_week
                AND (
                    (start_time <= :end_time AND end_time >= :start_time)
                )
            """)
            overlap_result = await db.execute(overlap_query, {
                "prestataire_id": prestataire_id,
                "day_of_week": availability.day_of_week,
                "start_time": start_time,
                "end_time": end_time
            })
            if overlap_result.fetchone():
                raise HTTPException(
                    status_code=400,
                    detail=f"Overlapping availability for {availability.day_of_week} {availability.start_time}-{availability.end_time}"
                )

            # Insert the availability for each specified day of the week
            insert_availability_query = text("""
                INSERT INTO prestataire_availabilities (prestataire_id, day_of_week, start_time, end_time)
                VALUES (:prestataire_id, :day_of_week, :start_time, :end_time)
            """)
            await db.execute(insert_availability_query, {
                "prestataire_id": prestataire_id,
                "day_of_week": availability.day_of_week.lower(),  # e.g., "monday", "tuesday"
                "start_time": start_time,
                "end_time": end_time
            })

    await db.commit()

    return {"message": "Prestataire created successfully", "prestataire_id": prestataire_id}
#availability based on the calender
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


#admin update availability

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