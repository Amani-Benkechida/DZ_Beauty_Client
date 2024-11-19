from fastapi import FastAPI, APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from .database import SessionLocal
from .models import User, Service
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get the database session
async def get_db():
    async with SessionLocal() as session:
        yield session

# Pydantic Schemas
class UserCreate(BaseModel):
    name: str
    email: str
    password_hash: str
    phone_number: str = None
    role: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone_number: str
    role: str

    class Config:
        from_attributes = True

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
        from_attributes = True

# Routers
user_router = APIRouter(prefix="/users", tags=["Users"])
service_router = APIRouter(prefix="/services", tags=["Services"])

# User Routes
@user_router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=user.password_hash,
        phone_number=user.phone_number,
        role=user.role
    )
    db.add(new_user)
    try:
        await db.commit()
        await db.refresh(new_user)
        return new_user
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already exists.")

@user_router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return user

@user_router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, updates: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    for key, value in updates.items():
        setattr(user, key, value)
    await db.commit()
    await db.refresh(user)
    return user

@user_router.delete("/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    await db.delete(user)
    await db.commit()
    return {"message": "User deleted successfully."}

# Service Routes
@service_router.post("/", response_model=ServiceResponse)
async def create_service(service: ServiceCreate, db: AsyncSession = Depends(get_db)):
    new_service = Service(
        name=service.name,
        description=service.description,
        base_price=service.base_price
    )
    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    return new_service

@service_router.get("/", response_model=list[ServiceResponse])
async def get_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service))
    return result.scalars().all()

@service_router.get("/{service_id}", response_model=ServiceResponse)
async def get_service(service_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.id == service_id))
    service = result.scalars().first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found.")
    return service

@service_router.put("/{service_id}", response_model=ServiceResponse)
async def update_service(service_id: int, updates: dict, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.id == service_id))
    service = result.scalars().first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found.")
    for key, value in updates.items():
        setattr(service, key, value)
    await db.commit()
    await db.refresh(service)
    return service

@service_router.delete("/{service_id}")
async def delete_service(service_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.id == service_id))
    service = result.scalars().first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found.")
    await db.delete(service)
    await db.commit()
    return {"message": "Service deleted successfully."}

# Register Routers
app.include_router(user_router)
app.include_router(service_router)
