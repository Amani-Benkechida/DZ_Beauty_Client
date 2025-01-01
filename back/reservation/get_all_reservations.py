from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

async def get_all_reservations(session: AsyncSession):
    # Raw SQL query to get all reservations with user details
    query = text("""
    SELECT 
        r.id,
        u.name,
        u.email,
        r.date,
        r.time,
        r.status
    FROM 
        reservations r
    JOIN 
        users u ON r.client_id = u.id
    """)

    result = await session.execute(query)
    reservations = result.fetchall()

    # Format the results into a list of dictionaries
    formatted_reservations = []
    for row in reservations:
        reservation = {
            'id': row[0],
            'name': row[1],
            'email': row[2],
            'date': row[3],
            'time': row[4],
            'status': row[5]
        }
        formatted_reservations.append(reservation)

    return formatted_reservations