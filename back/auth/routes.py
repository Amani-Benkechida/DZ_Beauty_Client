from fastapi import APIRouter, Depends, HTTPException, status,Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from database import get_db
from email_service import send_reset_email
from datetime import datetime, timedelta
import bcrypt
import secrets

from datetime import datetime, timedelta,time
from sqlalchemy import text

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
    time: str = Query(None, regex="^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$"),
    db: AsyncSession = Depends(get_db)
):
    # Capitalize and validate day_of_week
    day_of_week = day_of_week.lower()
    valid_days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    if day_of_week not in valid_days:
        logging.error(f"Invalid day_of_week: {day_of_week}")
        raise HTTPException(status_code=400, detail=f"Invalid day_of_week. Expected one of: {', '.join(valid_days)}")
    
    logging.info(f"Checking availability for prestataire_id={prestataire_id}, day_of_week={day_of_week}, time={time}")

    # Query database
    query = text("""
        SELECT start_time, end_time FROM prestataire_availabilities
        WHERE prestataire_id = :prestataire_id AND day_of_week = :day_of_week
    """)
    try:
        result = await db.execute(query, {"prestataire_id": prestataire_id, "day_of_week": day_of_week})
        availability = result.fetchall()
        logging.info(f"Database query result: {availability}")
    except Exception as e:
        logging.error(f"Database query failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

    if not availability:
        raise HTTPException(status_code=404, detail="No availability found for this prestataire on the selected day")

    # Process available slots
    available_slots = [
        {"start_time": slot[0], "end_time": slot[1]}
        for slot in availability
    ]
    logging.debug(f"Processed available slots: {available_slots}")

    # Check specific time if provided
    if time:
        requested_time = datetime.strptime(time, "%H:%M:%S").time() if ":" in time else datetime.strptime(time, "%H:%M").time()
        for slot in available_slots:
            # Directly use `datetime.time` objects without parsing them
            slot_start = slot["start_time"]
            slot_end = slot["end_time"]
            if slot_start <= requested_time <= slot_end:
                return {"available": True, "message": "Available", "slot": slot}
        return {"available": False, "message": "Not available at the requested time"}

    return {"available_slots": available_slots}



@router.post("/pay")
async def process_payment(reservation_id: int, payment_method: str, db: AsyncSession = Depends(get_db)):
    if payment_method not in ["credit_card", "paypal", "bank_transfer"]:
        raise HTTPException(status_code=400, detail="Invalid payment method")

    query = text("""
    SELECT id FROM reservations WHERE id = :reservation_id AND status = 'pending'
    """)
    result = await db.execute(query, {"reservation_id": reservation_id})
    if not result.fetchone():
        raise HTTPException(status_code=400, detail="Payment failed or reservation already paid")

    query = text("""
    UPDATE reservations SET status = 'paid'
    WHERE id = :reservation_id AND status = 'pending'
    RETURNING id
    """)
    result = await db.execute(query, {"reservation_id": reservation_id})
    updated_id = result.fetchone()

    if not updated_id:
        raise HTTPException(status_code=400, detail="Payment failed or reservation already paid")

    await db.commit()
    return {"status": "Payment successful", "reservation_id": updated_id[0]}

@router.post("/reserve")
async def create_reservation(client_id: int, prestataire_id: int, date: str, time: str, total_price: float, db: AsyncSession = Depends(get_db)):
    try:
        requested_time = datetime.strptime(time, "%H:%M").time()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid time format. Please use HH:MM.")

    query = text("""
    INSERT INTO reservations (client_id, prestataire_id, date, time, total_price, status)
    VALUES (:client_id, :prestataire_id, :date, :time, :total_price, 'pending')
    RETURNING id
    """)
    result = await db.execute(query, {
        "client_id": client_id,
        "prestataire_id": prestataire_id,
        "date": date,
        "time": time,
        "total_price": total_price
    })
    reservation_id = result.fetchone()[0]
    await db.commit()
    return {"reservation_id": reservation_id}
# Create prestataire
@router.post("/create")
async def create_prestataire(request: CreatePrestataireRequest, db: AsyncSession = Depends(get_db)):
    check_query = text("SELECT id FROM users WHERE email = :email")
    existing_user = await db.execute(check_query, {"email": request.email})
    if existing_user.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists.")

    insert_user_query = text("""
        INSERT INTO users (name, email, password_hash, phone_number, role)
        VALUES (:name, :email, :password_hash, :phone_number, 'prestataire')
        RETURNING id
    """)
    hashed_password = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt()).decode()
    result = await db.execute(insert_user_query, {
        "name": request.name,
        "email": request.email,
        "password_hash": hashed_password,
        "phone_number": request.phone_number
    })
    user_id = result.fetchone()[0]

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

    if request.availabilities:
        for availability in request.availabilities:
         
            start_time = datetime.strptime(availability.start_time, "%H:%M").time()
            end_time = datetime.strptime(availability.end_time, "%H:%M").time()

            insert_availability_query = text("""
                INSERT INTO prestataire_availabilities (prestataire_id, day_of_week, start_time, end_time)
                VALUES (:prestataire_id, :day_of_week, :start_time, :end_time)
            """)
            await db.execute(insert_availability_query, {
                "prestataire_id": prestataire_id,
                "day_of_week": availability.day_of_week,
                "start_time": start_time,
                "end_time": end_time
            })
        await db.commit()

    return {"message": "Prestataire created successfully", "prestataire_id": prestataire_id}