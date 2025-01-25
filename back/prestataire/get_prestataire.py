from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.deps import get_db
from datetime import datetime
from pydantic import BaseModel
from datetime import time,date

async def get_all_prestataires_by_service(
    service_id: int,
    db: AsyncSession = Depends(get_db)
):
    try:
        # Check if the service exists
        service_check = await db.execute(
            text("SELECT id FROM services WHERE id = :service_id"),
            {"service_id": service_id}
        )
        if not service_check.fetchone():
            raise HTTPException(status_code=404, detail="Service not found.")

        # Fetch all prestataires associated with the service
        result = await db.execute(
            text("""
                SELECT prestataire_id 
                FROM service_prestataires 
                WHERE service_id = :service_id
            """),
            {"service_id": service_id}
        )
        prestataires = result.fetchall()

        # If no prestataires are found, return an empty list
        if not prestataires:
            return {"prestataires": []}

        # Extract prestataire IDs
        prestataire_ids = [row[0] for row in prestataires]

        return {"prestataires": prestataire_ids}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    









class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str
    role: str
    created_at: str

    class Config:
        orm_mode = True   


async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM users WHERE id = :user_id")

    result = await db.execute(query, {"user_id": user_id})
    user = result.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Convert the Row object to a dictionary using _asdict()
    user_dict = user._asdict()

    # Convert 'created_at' from datetime to string (ISO format)
    if isinstance(user_dict['created_at'], datetime):
        user_dict['created_at'] = user_dict['created_at'].isoformat()

    # Return the user in the response model format
    return UserResponse(**user_dict)




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
        orm_mode = True

async def get_reservations_by_user(user_id: int, db: AsyncSession = Depends(get_db)):
   # Query to fetch all reservations made by the user
    query = text("SELECT * FROM reservations WHERE client_id = :user_id")
    result = await db.execute(query, {"user_id": user_id})
    reservations = result.fetchall()
    if not reservations:
       raise HTTPException(status_code=404, detail="No reservations found for this user.")

    # Convert the result into a list of ReservationResponse objects
    
    return [ReservationResponse(**dict(reservation._mapping)) for reservation in reservations]







class PrestataireProfileResponse(BaseModel):
    id: int
    user_id: int
    portfolio: str
    specializations: str
    rating: float
    reviews_count: int

    class Config:
        orm_mode = True
        
async def get_prestataire_profile(profile_id: int, db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM prestataire_profiles WHERE id = :profile_id")
    result = await db.execute(query, {"profile_id": profile_id})
    profile = result.fetchone()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found.")

    # Convert the Row object into a dictionary using _mapping
    profile_dict = dict(profile._mapping)

    # Return the profile data as a Pydantic model
    return PrestataireProfileResponse(**profile_dict)


class ServiceResponse(BaseModel):
    id: int
    name: str
    description: str
    base_price: float

    class Config:
        orm_mode = True

async def get_all_services(db: AsyncSession = Depends(get_db)):
    # Use raw SQL query to get all services
    query = text("SELECT * FROM services")

    # Execute the query
    result = await db.execute(query)

    # Fetch all results
    services = result.fetchall()

    # Check if services exist
    if not services:
        raise HTTPException(status_code=404, detail="No services found.")

    return services

