from sqlalchemy.ext.asyncio import create_async_engine
# from sqlalchemy import MetaData
from dotenv import load_dotenv
import asyncpg
from sqlalchemy import text
import os
import asyncio

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# metadata = MetaData()

async def init_db():
    async with engine.begin() as conn:
        # Create `users` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            phone_number VARCHAR(15),
            role VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            reset_token TEXT,
            reset_token_expiry TIMESTAMP
        );
        """ ))
    

        # Create `services` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS services (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            base_price DECIMAL(10, 2) NOT NULL
        );
        """))

        # Create `prestataire_profiles` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS prestataire_profiles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
            portfolio TEXT,
            specializations TEXT,
            rating DECIMAL(3, 2) DEFAULT 0,
            reviews_count INTEGER DEFAULT 0
        );
        """))

        # Create `prestataire_availabilities` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS prestataire_availabilities (
            id SERIAL PRIMARY KEY,
            prestataire_id INTEGER REFERENCES prestataire_profiles(id) ON DELETE CASCADE,
            day_of_week VARCHAR(10) NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL
        );
        """))

  # Create `reservations` table
        await conn.execute(text(""" 
    CREATE TABLE IF NOT EXISTS reservations (
       id SERIAL PRIMARY KEY,  -- This line needs to be followed by a comma
       client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
       prestataire_id INTEGER REFERENCES prestataire_profiles(id) ON DELETE CASCADE,
       service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
       date DATE NOT NULL,
       time TIME NOT NULL,  
       end_time TIME NOT NULL, 
       status VARCHAR(50) DEFAULT 'pending' NOT NULL,
       total_price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );
"""))



        # Create `loyalty_program` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS loyalty_program (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            points INTEGER DEFAULT 0,
            last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """))

        # Create `special_offers` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS special_offers (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT,
            discount_percentage DECIMAL(5, 2) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL
        );
        """))

        # Create `service_prestataires` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS service_prestataires (
            id SERIAL PRIMARY KEY,
            service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
            prestataire_id INTEGER REFERENCES prestataire_profiles(id) ON DELETE CASCADE
        );
        """))

        # Create `reviews` table
        await conn.execute(text("""
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            prestataire_id INTEGER REFERENCES prestataire_profiles(id) ON DELETE CASCADE,
            rating DECIMAL(3, 2) NOT NULL,
            comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """))

if __name__ == "__main__":
    asyncio.run(init_db())






