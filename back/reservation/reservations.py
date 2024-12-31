from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from setup.database import get_db
from datetime import datetime, timedelta
from datetime import datetime as dt_datetime
from sqlalchemy import text

router = APIRouter(prefix="/reservation", tags=["RESERVATION"])

@router.post("/reserve")
async def create_reservation(
    client_id: int,
    prestataire_id: int,
    services: list,  # List of dictionaries containing service_id, date, start_time, end_time, total_price
    db: AsyncSession = Depends(get_db)
):
    reservation_ids = []
    total_price = 0  # Variable to accumulate the total price of all services

    for service in services:
        service_id = service["service_id"]
        date = service["date"]  # YYYY-MM-DD
        start_time = service["start_time"]  # HH:MM (Start time of the reservation)
        end_time = service["end_time"]  # HH:MM (End time of the reservation)
        service_price = service["total_price"]  # Individual service price

        # Add the price of the current service to the total price
        total_price += service_price

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

        # Insert the reservation for each service
        insert_reservation_query = text("""
            INSERT INTO reservations (client_id, prestataire_id, service_id, date, time, end_time, total_price)
            VALUES (:client_id, :prestataire_id, :service_id, :date, :start_time, :end_time, :total_price)
            RETURNING id
        """)
        result = await db.execute(insert_reservation_query, {
            "client_id": client_id,
            "prestataire_id": prestataire_id,
            "service_id": service_id,
            "date": reservation_date,
            "start_time": start_time_obj,
            "end_time": end_time_obj,
            "total_price": service_price  # Insert the price for this service
        })
        reservation_id = result.fetchone()[0]
        reservation_ids.append(reservation_id)

        # Update the availability after reservation (remove only the reserved time)
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

    # After all reservations are inserted, update the total price for all reservations
    for reservation_id in reservation_ids:
        update_total_price_query = text("""
            UPDATE reservations
            SET total_price = :total_price
            WHERE id = :reservation_id
        """)
        await db.execute(update_total_price_query, {
            "total_price": total_price,
            "reservation_id": reservation_id
        })

    await db.commit()
    return {"reservation_ids": reservation_ids, "total_price": total_price}
