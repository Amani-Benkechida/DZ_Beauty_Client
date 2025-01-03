from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from datetime import datetime
from sqlalchemy import text
import shutil
import os
from passlib.context import CryptContext
from dotenv import load_dotenv
router = APIRouter(prefix="/prestataire", tags=["PROFILE"])

load_dotenv()
DEFAULT_PASSWORD= os.getenv("DEFAULT_PASSWORD")

UPLOAD_DIR = "./uploaded_photos"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/create")
async def create_prestataire(
    name: str = Form(...),
    family_name: str = Form(...),
    phone_number: str = Form(...),
    email: str = Form(...),
    position: str = Form(...),
    gender: str = Form(...),
    photo: UploadFile = File(...),
    availabilities: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
   
   # print(f"Received name: {name}")
   # print(f"Received family name: {family_name}")
    #print(f"Received phone number: {phone_number}")
    #print(f"Received email: {email}")
    #print(f"Received position: {position}")
    #print(f"Received gender: {gender}")
    print(f"Received availabilities: {availabilities}")

    existing_user_query = text("SELECT id FROM users WHERE email = :email")
    result = await db.execute(existing_user_query, {"email": email})
    existing_user = result.fetchone()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists.")


    photo_path = os.path.join(UPLOAD_DIR, photo.filename)
    with open(photo_path, "wb") as buffer:
        shutil.copyfileobj(photo.file, buffer)

  
    hashed_password = pwd_context.hash(DEFAULT_PASSWORD)

   
    insert_user_query = text("""
        INSERT INTO users (name, email, phone_number, role, password_hash)
        VALUES (:name, :email, :phone_number, 'prestataire', :password_hash)
        RETURNING id
    """)
    result = await db.execute(insert_user_query, {
        "name": f"{name} {family_name}",
        "email": email,
        "phone_number": phone_number,
        "password_hash": hashed_password
    })
    user_id = result.fetchone()[0]

    # Insert prest profile
    insert_profile_query = text("""
        INSERT INTO prestataire_profiles (user_id, portfolio, gender, photo, specializations)
        VALUES (:user_id, :portfolio, :gender, :photo, :specializations)
        RETURNING id
    """)
    result = await db.execute(insert_profile_query, {
        "user_id": user_id,
        "portfolio": photo_path,
        "gender": gender,
        "photo": photo_path,
        "specializations": position
    })
    prestataire_id = result.fetchone()[0]

    if availabilities:
        try:
            parsed_availabilities = eval(availabilities)  # Parse string to list of dicts
            for availability in parsed_availabilities:
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
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid availability format: {e}")

    await db.commit()

    return {"message": "Prestataire created successfully"}

