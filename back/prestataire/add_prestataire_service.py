from fastapi import  HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.deps import get_db


async def add_prestataire_to_service(
    prestataire_id: int,
    service_id: int,
    db: AsyncSession = Depends(get_db)
):
    try:
        # Check if the prestataire exists
        prestataire_check = await db.execute(
            text("SELECT id FROM prestataire_profiles WHERE id = :prestataire_id"),
            {"prestataire_id": prestataire_id}
        )
        if not prestataire_check.fetchone():
            raise HTTPException(status_code=404, detail="Prestataire not found.")

        # Check if the service exists
        service_check = await db.execute(
            text("SELECT id FROM services WHERE id = :service_id"),
            {"service_id": service_id}
        )
        if not service_check.fetchone():
            raise HTTPException(status_code=404, detail="Service not found.")

        # Check if the relationship already exists
        relationship_check = await db.execute(
            text("""
                SELECT id FROM service_prestataires 
                WHERE prestataire_id = :prestataire_id AND service_id = :service_id
            """),
            {"prestataire_id": prestataire_id, "service_id": service_id}
        )
        if relationship_check.fetchone():
            raise HTTPException(status_code=400, detail="Prestataire is already linked to this service.")

        # Add the relationship
        await db.execute(
            text("""
                INSERT INTO service_prestataires (prestataire_id, service_id)
                VALUES (:prestataire_id, :service_id)
            """),
            {"prestataire_id": prestataire_id, "service_id": service_id}
        )
        await db.commit()

        return {"message": f"Prestataire {prestataire_id} successfully linked to service {service_id}."}

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")