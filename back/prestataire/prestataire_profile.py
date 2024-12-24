import bcrypt
from fastapi import APIRouter, Depends, HTTPException, status,Query
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from datetime import datetime, timedelta,time
from sqlalchemy import text
from auth.models import CreatePrestataireRequest 

router = APIRouter(prefix="/prestataire", tags=["PROFILE"])







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