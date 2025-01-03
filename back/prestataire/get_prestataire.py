from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.deps import get_db

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