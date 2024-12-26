from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from setup.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Optional
from datetime import datetime, date, time
from auth.auth import router as auth_router
from review.review import router as reviews_router
from offers.loyality import router as loyality_router
from offers.specialOffer import router as spacialOffer_router
from offers.specialOffer import send_special_offers
from setup.deps import get_db
from apscheduler.schedulers.background import BackgroundScheduler
from reservation.payment import router as payment_router


# Initialize FastAPI Application
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



scheduler = BackgroundScheduler()
@app.on_event("startup")
async def startup_event():
    scheduler.add_job(send_special_offers, "interval", hours=24)
    scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    scheduler.shutdown()



# Register Routers

app.include_router(auth_router)
app.include_router(reviews_router)
app.include_router(loyality_router)
app.include_router(spacialOffer_router)
app.include_router(payment_router)


# Pydantic Schemas for All Tables# Pydantic Schemas for All Tables
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str
    role: str
    created_at: str

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    name: str
    email: str
    password_hash: str
    phone_number: str = None
    role: str


class UserUpdate(BaseModel):
    name: str
    email: str
    phone_number: str
    role: str


class PrestataireProfileCreate(BaseModel):
    user_id: int
    portfolio: str = None
    specializations: str = None
    rating: float = 0
    reviews_count: int = 0


class PrestataireProfileResponse(BaseModel):
    id: int
    user_id: int
    portfolio: str
    specializations: str
    rating: float
    reviews_count: int

    class Config:
        orm_mode = True


class PrestataireProfileUpdate(BaseModel):
    user_id: Optional[int]
    portfolio: Optional[str]
    specializations: Optional[str]
    rating: Optional[float]
    reviews_count: Optional[int]


class ServiceCreate(BaseModel):
    name: str
    description: str = None
    base_price: float


class ServiceResponse(BaseModel):
    id: int
    name: str
    description: str
    base_price: float

    class Config:
        orm_mode = True


class ServiceUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    base_price: Optional[float]


class PrestataireAvailabilityCreate(BaseModel):
    prestataire_id: int
    day_of_week: str
    start_time: time
    end_time: time


class PrestataireAvailabilityResponse(BaseModel):
    id: int
    prestataire_id: int
    day_of_week: str
    start_time: time
    end_time: time

    class Config:
        orm_mode = True


class ReservationCreate(BaseModel):
    client_id: int
    prestataire_id: int
    service_id: int
    date: date
    time: time
    status: str
    total_price: float


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


class LoyaltyProgramCreate(BaseModel):
    client_id: int
    points: int


class LoyaltyProgramResponse(BaseModel):
    id: int
    client_id: int
    points: int
    last_updated: datetime

    class Config:
        orm_mode = True


class SpecialOfferCreate(BaseModel):
    title: str
    description: str
    discount_percentage: float
    start_date: date
    end_date: date


class SpecialOfferResponse(BaseModel):
    id: int
    title: str
    description: str
    discount_percentage: float
    start_date: date
    end_date: date

    class Config:
        orm_mode = True


class ReviewCreate(BaseModel):
    client_id: int
    prestataire_id: int
    rating: int
    comment: str


class ReviewResponse(BaseModel):
    id: int
    client_id: int
    prestataire_id: int
    rating: int
    comment: str

    class Config:
        orm_mode = True


# Routers
user_router = APIRouter(prefix="/users", tags=["Users"])
prestataire_profile_router = APIRouter(
    prefix="/prestataire_profiles", tags=["Prestataire Profiles"])
service_router = APIRouter(prefix="/services", tags=["Services"])
prestataire_availability_router = APIRouter(
    prefix="/prestataire_availabilities", tags=["Prestataire Availabilities"])
reservation_router = APIRouter(prefix="/reservations", tags=["Reservations"])
loyalty_program_router = APIRouter(
    prefix="/loyalty_programs", tags=["Loyalty Programs"])
special_offer_router = APIRouter(
    prefix="/special_offers", tags=["Special Offers"])
review_router = APIRouter(prefix="/review", tags=["Review"])

# User Routes


@user_router.post("/", response_model=dict)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO users (name, email, password_hash, phone_number, role, created_at)
                    VALUES (:name, :email, :password_hash, :phone_number, :role, NOW()) 
                    RETURNING id""")
    try:
        # Execute the insert query
        result = await db.execute(query, user.dict())
        # Commit the transaction
        await db.commit()

        # Get the returned id
        user_id = result.scalar()

        # Check if the user ID is returned correctly
        if user_id is None:
            raise HTTPException(
                status_code=400, detail="Failed to create user.")

        return {"message": "User created successfully.", "user_id": user_id}

    except IntegrityError as e:
        # Handle specific database integrity errors (like duplicate email)
        db.rollback()  # Rollback transaction in case of error
        raise HTTPException(
            status_code=400, detail=f"Integrity error: {str(e)}")

    except Exception as e:
        # Log and handle unexpected errors
        db.rollback()  # Rollback transaction in case of unexpected error
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")


@user_router.get("/users", response_model=List[UserResponse])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM users")

    result = await db.execute(query)
    users = result.fetchall()

    if not users:
        raise HTTPException(status_code=404, detail="No users found.")

    # Convert each user to a dictionary and format datetime
    user_list = []
    for user in users:
        user_dict = user._asdict()

        # Convert 'created_at' from datetime to string (ISO format)
        if isinstance(user_dict['created_at'], datetime):
            user_dict['created_at'] = user_dict['created_at'].isoformat()

        user_list.append(UserResponse(**user_dict))

    return user_list


@user_router.get("/{user_id}", response_model=UserResponse)
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


@user_router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user: UserUpdate, db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE users 
        SET name = :name, email = :email, phone_number = :phone_number, role = :role
        WHERE id = :user_id
        RETURNING id, name, email, phone_number, role, created_at
    """)

    try:
        # Execute the update query
        result = await db.execute(query, {**user.dict(), "user_id": user_id})
        updated_user = result.fetchone()

        if not updated_user:
            raise HTTPException(status_code=404, detail="User not found.")

        # Convert 'created_at' to ISO format
        user_dict = dict(updated_user._mapping)
        if isinstance(user_dict['created_at'], datetime):
            user_dict['created_at'] = user_dict['created_at'].isoformat()

        return UserResponse(**user_dict)

    except IntegrityError as e:
        db.rollback()  # Rollback transaction in case of error
        raise HTTPException(
            status_code=400, detail=f"Integrity error: {str(e)}")

    except Exception as e:
        db.rollback()  # Rollback transaction in case of unexpected error
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")


@user_router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    query = text("DELETE FROM users WHERE id = :user_id RETURNING id")

    try:
        # Execute the delete query
        result = await db.execute(query, {"user_id": user_id})
        deleted_user_id = result.scalar()

        if not deleted_user_id:
            raise HTTPException(status_code=404, detail="User not found.")

        # Commit the transaction
        await db.commit()

        return {"message": f"User with id {user_id} deleted successfully."}

    except Exception as e:
        db.rollback()  # Rollback transaction in case of unexpected error
        raise HTTPException(
            status_code=500, detail=f"Internal Server Error: {str(e)}")


# Prestataire Profile Routes
@prestataire_profile_router.post("/", response_model=dict)
async def create_prestataire_profile(profile: PrestataireProfileCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO prestataire_profiles (user_id, portfolio, specializations, rating, reviews_count)
                    VALUES (:user_id, :portfolio, :specializations, :rating, :reviews_count)
                    RETURNING id""")
    try:
        result = await db.execute(query, profile.dict())
        await db.commit()
        profile_id = result.scalar()
        if not profile_id:
            raise HTTPException(
                status_code=500, detail="Failed to create Prestataire profile.")

        return {"message": "Prestataire Profile created successfully.", "profile_id": profile_id}

    except IntegrityError:
        await db.rollback()  # Ensure the transaction is rolled back if there's an error
        raise HTTPException(
            status_code=400, detail="Error creating profile. Integrity error.")

    except Exception as e:
        await db.rollback()  # Rollback for any other unexpected error
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@prestataire_profile_router.get("/{profile_id}", response_model=PrestataireProfileResponse)
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


@prestataire_profile_router.get("/", response_model=List[PrestataireProfileResponse])
async def get_all_prestataire_profiles(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM prestataire_profiles")

    try:
        # Execute the query
        result = await db.execute(query)

        # Fetch all rows
        profiles = result.fetchall()

        if not profiles:
            raise HTTPException(status_code=404, detail="No profiles found.")

        # Convert each Row object to a dictionary
        profile_list = [PrestataireProfileResponse(
            **dict(profile._mapping)) for profile in profiles]

        # Return the list of profiles
        return profile_list

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@prestataire_profile_router.put("/{profile_id}", response_model=PrestataireProfileResponse)
async def update_prestataire_profile(
    profile_id: int,
    updated_profile: PrestataireProfileUpdate,
    db: AsyncSession = Depends(get_db)
):
    query = text("""
        UPDATE prestataire_profiles 
        SET 
            user_id = COALESCE(:user_id, user_id),
            portfolio = COALESCE(:portfolio, portfolio),
            specializations = COALESCE(:specializations, specializations),
            rating = COALESCE(:rating, rating),
            reviews_count = COALESCE(:reviews_count, reviews_count)
        WHERE id = :profile_id
        RETURNING *
    """)

    try:
        # Execute the query
        result = await db.execute(query, {**updated_profile.dict(exclude_unset=True), "profile_id": profile_id})
        await db.commit()
        profile = result.fetchone()

        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found.")

        # Convert the Row object into a dictionary using _mapping
        profile_dict = dict(profile._mapping)

        # Return the updated profile as a Pydantic model
        return PrestataireProfileResponse(**profile_dict)

    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=400, detail="Integrity error while updating profile.")

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@prestataire_profile_router.delete("/{profile_id}", response_model=dict)
async def delete_prestataire_profile(profile_id: int, db: AsyncSession = Depends(get_db)):
    query = text(
        "DELETE FROM prestataire_profiles WHERE id = :profile_id RETURNING id")

    try:
        # Execute the query
        result = await db.execute(query, {"profile_id": profile_id})
        await db.commit()
        deleted_id = result.scalar()

        if not deleted_id:
            raise HTTPException(
                status_code=404, detail="Profile not found or already deleted.")

        return {"message": "Profile deleted successfully.", "profile_id": deleted_id}

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


# Service Routes
@service_router.post("/", response_model=dict)
async def create_service(service: ServiceCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO services (name, description, base_price)
                    VALUES (:name, :description, :base_price)
                    RETURNING id""")
    try:
        result = await db.execute(query, service.dict())
        await db.commit()
        service_id = result.scalar()
        return {"message": "Service created successfully.", "service_id": service_id}
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Error creating service.")


@service_router.get("/{service_id}", response_model=ServiceResponse)
async def get_service(service_id: int, db: AsyncSession = Depends(get_db)):
    # Execute the query to fetch the service by its ID
    query = text("SELECT * FROM services WHERE id = :service_id")
    result = await db.execute(query, {"service_id": service_id})
    service = result.fetchone()  # Fetch the first result from the query

    if not service:
        raise HTTPException(status_code=404, detail="Service not found.")

    # Convert the Row object into a dictionary using _mapping
    service_dict = dict(service._mapping)

    # Return the service data as a Pydantic model
    return ServiceResponse(**service_dict)


@service_router.get("/", response_model=List[ServiceResponse])
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


@service_router.put("/{service_id}", response_model=dict)
async def update_service(service_id: int, service: ServiceUpdate, db: AsyncSession = Depends(get_db)):
    query = text("""UPDATE services 
                    SET name = :name, 
                        description = :description, 
                        base_price = :base_price
                    WHERE id = :service_id
                    RETURNING id""")
    try:
        # Execute the update query
        result = await db.execute(
            query,
            {**service.dict(exclude_unset=True), "service_id": service_id}
        )
        await db.commit()

        updated_service_id = result.scalar()
        if not updated_service_id:
            raise HTTPException(
                status_code=404, detail="Service not found or update failed.")

        return {"message": "Service updated successfully.", "service_id": updated_service_id}
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error updating service.")
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@service_router.delete("/{service_id}", response_model=dict)
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    query = text("DELETE FROM services WHERE id = :service_id RETURNING id")
    try:
        # Execute the delete query
        result = await db.execute(query, {"service_id": service_id})
        await db.commit()

        deleted_service_id = result.scalar()
        if not deleted_service_id:
            raise HTTPException(
                status_code=404, detail="Service not found or already deleted.")

        return {"message": "Service deleted successfully.", "service_id": deleted_service_id}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


# # Prestataire Availability Routes
@prestataire_availability_router.post("/", response_model=dict)
async def create_availability(availability: PrestataireAvailabilityCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO prestataire_availabilities 
                    (prestataire_id, day_of_week, start_time, end_time)
                    VALUES (:prestataire_id, :day_of_week, :start_time, :end_time)
                    RETURNING id""")
    try:
        result = await db.execute(query, availability.dict())
        await db.commit()
        availability_id = result.scalar()
        return {"message": "Availability created successfully.", "availability_id": availability_id}
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=400, detail="Error creating availability.")
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@prestataire_availability_router.get("/{availability_id}", response_model=PrestataireAvailabilityResponse)
async def get_availability(availability_id: int, db: AsyncSession = Depends(get_db)):
    query = text(
        "SELECT * FROM prestataire_availabilities WHERE id = :availability_id")
    result = await db.execute(query, {"availability_id": availability_id})
    availability = result.fetchone()
    if not availability:
        raise HTTPException(status_code=404, detail="Availability not found.")
    return PrestataireAvailabilityResponse(**dict(availability._mapping))


@prestataire_availability_router.get("/", response_model=List[PrestataireAvailabilityResponse])
async def get_all_availabilities(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM prestataire_availabilities")
    result = await db.execute(query)
    availabilities = result.fetchall()
    return [PrestataireAvailabilityResponse(**dict(av._mapping)) for av in availabilities]


@prestataire_availability_router.put("/{availability_id}", response_model=dict)
async def update_availability(availability_id: int, updated_data: PrestataireAvailabilityCreate, db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE prestataire_availabilities 
        SET prestataire_id = :prestataire_id, day_of_week = :day_of_week, start_time = :start_time, end_time = :end_time
        WHERE id = :availability_id
    """)
    try:
        result = await db.execute(query, {**updated_data.dict(), "availability_id": availability_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Availability not found.")
        return {"message": "Availability updated successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error updating availability: {str(e)}")


@prestataire_availability_router.delete("/{availability_id}", response_model=dict)
async def delete_availability(availability_id: int, db: AsyncSession = Depends(get_db)):
    query = text(
        "DELETE FROM prestataire_availabilities WHERE id = :availability_id")
    try:
        result = await db.execute(query, {"availability_id": availability_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Availability not found.")
        return {"message": "Availability deleted successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error deleting availability: {str(e)}")


# # # Reservation Routes
@reservation_router.post("/", response_model=dict)
async def create_reservation(reservation: ReservationCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO reservations 
                    (client_id, prestataire_id, service_id, date, time, status, total_price)
                    VALUES (:client_id, :prestataire_id, :service_id, :date, :time, :status, :total_price)
                    RETURNING id""")
    try:
        result = await db.execute(query, reservation.dict())
        await db.commit()
        reservation_id = result.scalar()
        return {"message": "Reservation created successfully.", "reservation_id": reservation_id}
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=400, detail="Error creating reservation.")
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@reservation_router.get("/{reservation_id}", response_model=ReservationResponse)
async def get_reservation(reservation_id: int, db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM reservations WHERE id = :reservation_id")
    result = await db.execute(query, {"reservation_id": reservation_id})
    reservation = result.fetchone()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found.")
    return ReservationResponse(**dict(reservation._mapping))


@reservation_router.get("/", response_model=List[ReservationResponse])
async def get_all_reservations(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM reservations")
    result = await db.execute(query)
    reservations = result.fetchall()
    return [ReservationResponse(**dict(rv._mapping)) for rv in reservations]


@prestataire_availability_router.delete("/{availability_id}", response_model=dict)
async def delete_availability(availability_id: int, db: AsyncSession = Depends(get_db)):
    query = text(
        "DELETE FROM prestataire_availabilities WHERE id = :availability_id")
    try:
        result = await db.execute(query, {"availability_id": availability_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Availability not found.")
        return {"message": "Availability deleted successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error deleting availability: {str(e)}")


@reservation_router.put("/{reservation_id}", response_model=dict)
async def update_reservation(reservation_id: int, updated_data: ReservationCreate, db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE reservations 
        SET client_id = :client_id, prestataire_id = :prestataire_id, service_id = :service_id,
            date = :date, time = :time, status = :status, total_price = :total_price
        WHERE id = :reservation_id
    """)
    try:
        result = await db.execute(query, {**updated_data.dict(), "reservation_id": reservation_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Reservation not found.")
        return {"message": "Reservation updated successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error updating reservation: {str(e)}")


@reservation_router.delete("/{reservation_id}", response_model=dict)
async def delete_reservation(reservation_id: int, db: AsyncSession = Depends(get_db)):
    query = text("DELETE FROM reservations WHERE id = :reservation_id")
    try:
        result = await db.execute(query, {"reservation_id": reservation_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Reservation not found.")
        return {"message": "Reservation deleted successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error deleting reservation: {str(e)}")


# # # Loyalty Program Routes
@loyalty_program_router.post("/", response_model=dict)
async def create_loyalty_program(loyalty: LoyaltyProgramCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO loyalty_program 
                    (client_id, points, last_updated)
                    VALUES (:client_id, :points, NOW())
                    RETURNING id""")
    try:
        result = await db.execute(query, loyalty.dict())
        await db.commit()
        loyalty_id = result.scalar()
        return {"message": "Loyalty program created successfully.", "loyalty_id": loyalty_id}
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=400, detail="Error creating loyalty program.")
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@loyalty_program_router.get("/{loyalty_id}", response_model=LoyaltyProgramResponse)
async def get_loyalty_program(loyalty_id: int, db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM loyalty_program WHERE id = :loyalty_id")
    result = await db.execute(query, {"loyalty_id": loyalty_id})
    loyalty = result.fetchone()
    if not loyalty:
        raise HTTPException(
            status_code=404, detail="Loyalty program not found.")
    return LoyaltyProgramResponse(**dict(loyalty._mapping))


@loyalty_program_router.get("/", response_model=List[LoyaltyProgramResponse])
async def get_all_loyalty_programs(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM loyalty_program")
    result = await db.execute(query)
    loyalty_programs = result.fetchall()
    return [LoyaltyProgramResponse(**dict(lp._mapping)) for lp in loyalty_programs]


@loyalty_program_router.put("/{loyalty_id}", response_model=dict)
async def update_loyalty_program(loyalty_id: int, updated_data: LoyaltyProgramCreate, db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE loyalty_program 
        SET client_id = :client_id, points = :points, last_updated = NOW()
        WHERE id = :loyalty_id
    """)
    try:
        result = await db.execute(query, {**updated_data.dict(), "loyalty_id": loyalty_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Loyalty program not found.")
        return {"message": "Loyalty program updated successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error updating loyalty program: {str(e)}")


@loyalty_program_router.delete("/{loyalty_id}", response_model=dict)
async def delete_loyalty_program(loyalty_id: int, db: AsyncSession = Depends(get_db)):
    query = text("DELETE FROM loyalty_program WHERE id = :loyalty_id")
    try:
        result = await db.execute(query, {"loyalty_id": loyalty_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Loyalty program not found.")
        return {"message": "Loyalty program deleted successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error deleting loyalty program: {str(e)}")


# # # Special Offer Routes
@special_offer_router.post("/", response_model=dict)
async def create_special_offer(offer: SpecialOfferCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO special_offers 
                    (title, description, discount_percentage, start_date, end_date)
                    VALUES (:title, :description, :discount_percentage, :start_date, :end_date)
                    RETURNING id""")
    try:
        result = await db.execute(query, offer.dict())
        await db.commit()
        offer_id = result.scalar()
        return {"message": "Special offer created successfully.", "offer_id": offer_id}
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=400, detail="Error creating special offer.")
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@special_offer_router.get("/{offer_id}", response_model=SpecialOfferResponse)
async def get_special_offer(offer_id: int, db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM special_offers WHERE id = :offer_id")
    result = await db.execute(query, {"offer_id": offer_id})
    offer = result.fetchone()
    if not offer:
        raise HTTPException(status_code=404, detail="Special offer not found.")
    return SpecialOfferResponse(**dict(offer._mapping))


@special_offer_router.get("/", response_model=List[SpecialOfferResponse])
async def get_all_special_offers(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM special_offers")
    result = await db.execute(query)
    special_offers = result.fetchall()
    return [SpecialOfferResponse(**dict(offer._mapping)) for offer in special_offers]


@special_offer_router.put("/{offer_id}", response_model=dict)
async def update_special_offer(offer_id: int, updated_data: SpecialOfferCreate, db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE special_offers 
        SET title = :title, description = :description, discount_percentage = :discount_percentage,
            start_date = :start_date, end_date = :end_date
        WHERE id = :offer_id
    """)
    try:
        result = await db.execute(query, {**updated_data.dict(), "offer_id": offer_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Special offer not found.")
        return {"message": "Special offer updated successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error updating special offer: {str(e)}")


@special_offer_router.delete("/{offer_id}", response_model=dict)
async def delete_special_offer(offer_id: int, db: AsyncSession = Depends(get_db)):
    query = text("DELETE FROM special_offers WHERE id = :offer_id")
    try:
        result = await db.execute(query, {"offer_id": offer_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(
                status_code=404, detail="Special offer not found.")
        return {"message": "Special offer deleted successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error deleting special offer: {str(e)}")


# # Review Routes
@review_router.post("/", response_model=dict)
async def create_review(review: ReviewCreate, db: AsyncSession = Depends(get_db)):
    query = text("""INSERT INTO reviews 
                    (client_id, prestataire_id, rating, comment)
                    VALUES (:client_id, :prestataire_id, :rating, :comment)
                    RETURNING id""")
    try:
        result = await db.execute(query, review.dict())
        await db.commit()
        review_id = result.scalar()
        return {"message": "Review created successfully.", "review_id": review_id}
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Error creating review.")
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Internal server error: {str(e)}")


@review_router.get("/{review_id}", response_model=ReviewResponse)
async def get_review(review_id: int, db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM reviews WHERE id = :review_id")
    result = await db.execute(query, {"review_id": review_id})
    review = result.fetchone()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found.")
    return ReviewResponse(**dict(review._mapping))


@review_router.get("/", response_model=List[ReviewResponse])
async def get_all_reviews(db: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM reviews")
    result = await db.execute(query)
    reviews = result.fetchall()
    return [ReviewResponse(**dict(rev._mapping)) for rev in reviews]


@review_router.put("/{review_id}", response_model=dict)
async def update_review(review_id: int, updated_data: ReviewCreate, db: AsyncSession = Depends(get_db)):
    query = text("""
        UPDATE reviews 
        SET client_id = :client_id, prestataire_id = :prestataire_id, rating = :rating, comment = :comment
        WHERE id = :review_id
    """)
    try:
        result = await db.execute(query, {**updated_data.dict(), "review_id": review_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Review not found.")
        return {"message": "Review updated successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error updating review: {str(e)}")


@review_router.delete("/{review_id}", response_model=dict)
async def delete_review(review_id: int, db: AsyncSession = Depends(get_db)):
    query = text("DELETE FROM reviews WHERE id = :review_id")
    try:
        result = await db.execute(query, {"review_id": review_id})
        await db.commit()
        if result.rowcount == 0:
            raise HTTPException(status_code=404, detail="Review not found.")
        return {"message": "Review deleted successfully."}
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error deleting review: {str(e)}")



app.include_router(user_router)
app.include_router(prestataire_profile_router)
app.include_router(service_router)
app.include_router(prestataire_availability_router)
app.include_router(reservation_router)
app.include_router(loyalty_program_router)
app.include_router(special_offer_router)
app.include_router(review_router)