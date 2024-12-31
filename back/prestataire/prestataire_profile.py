from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from datetime import datetime, time
from sqlalchemy import text
from auth.models import CreatePrestataireRequest
import shutil
import os

router = APIRouter(prefix="/prestataire", tags=["PROFILE"])

UPLOAD_DIR = "./uploaded_photos"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/create")
async def create_prestataire(
    name: str = Form(...),
    family_name: str = Form(...),
    phone_number: str = Form(...),
    email: str = Form(...),
    position: str = Form(...),
    gender: str = Form(...),
    photo: UploadFile = File(...),
    availabilities: List[dict] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    # Step 1: Check if the email already exists
    existing_user_query = text("SELECT id FROM users WHERE email = :email")
    existing_user = await db.execute(existing_user_query, {"email": email})
    if existing_user.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists.")

    # Step 2: Save the photo
    photo_path = os.path.join(UPLOAD_DIR, photo.filename)
    with open(photo_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

    # Step 3: Insert new user
    insert_user_query = text("""
        INSERT INTO users (name, email, phone_number, role)
        VALUES (:name, :email, :phone_number, 'prestataire')
        RETURNING id
    """)
    result = await db.execute(insert_user_query, {
        "name": f"{name} {family_name}",
        "email": email,
        "phone_number": phone_number
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
        "portfolio": photo_path,
        "specializations": position
    })
    prestataire_id = result.fetchone()[0]

    # Step 5: Insert availability slots
    if availabilities:
        for availability in availabilities:
            try:
                start_time = datetime.strptime(availability["start_time"], "%H:%M").time()
                end_time = datetime.strptime(availability["end_time"], "%H:%M").time()

                insert_availability_query = text("""
                    INSERT INTO prestataire_availabilities (prestataire_id, day_of_week, start_time, end_time)
                    VALUES (:prestataire_id, :day_of_week, :start_time, :end_time)
                """)
                await db.execute(insert_availability_query, {
                    "prestataire_id": prestataire_id,
                    "day_of_week": availability["day_of_week"],
                    "start_time": start_time,
                    "end_time": end_time
                })
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid time format. Use HH:MM format for times.")

    await db.commit()
    return {"message": "Prestataire created successfully", "prestataire_id": prestataire_id}

@router.put("/availability/update/{prestataire_id}")
async def update_availability(prestataire_id: int, availabilities: List[dict], db: AsyncSession = Depends(get_db)):
    # Clear existing availability
    delete_query = text("DELETE FROM prestataire_availabilities WHERE prestataire_id = :prestataire_id")
    await db.execute(delete_query, {"prestataire_id": prestataire_id})

    # Insert new availability slots
    for availability in availabilities:
        try:
            start_time = datetime.strptime(availability["start_time"], "%H:%M").time()
            end_time = datetime.strptime(availability["end_time"], "%H:%M").time()

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