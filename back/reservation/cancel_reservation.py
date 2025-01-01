from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from fastapi import HTTPException

async def cancel_reservation(reservation_id: int, session: AsyncSession):
    # Raw SQL query to update the reservation status to 'canceled'
    query = text("""
    UPDATE reservations
    SET status = 'canceled'
    WHERE id = :reservation_id
    """)

    # Execute the query
    result = await session.execute(query, {"reservation_id": reservation_id})
    
    # Check if any rows were updated
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Reservation not found.")

    await session.commit()  # Commit the transaction
    return {"message": "Reservation canceled successfully."}