from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from setup.deps import get_db

router = APIRouter(prefix="/make-review", tags=["makeReview"])
@router.post("/make-review/")
async def make_review(
    client_id: int,
    prestataire_id: int,
    rating: float,
    comment: str,
    db: AsyncSession = Depends(get_db)
):
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5.")

    async with db.begin():
        # Validate client
        client_check = await db.execute(
            text("SELECT id FROM users WHERE id = :client_id"),
            {"client_id": client_id}
        )
        if not client_check.fetchone():
            raise HTTPException(status_code=404, detail="Client not found.")

        # Validate prestataire
        prestataire_check = await db.execute(
            text("SELECT id FROM prestataire_profiles WHERE id = :prestataire_id"),
            {"prestataire_id": prestataire_id}
        )
        if not prestataire_check.fetchone():
            raise HTTPException(status_code=404, detail="Prestataire not found.")

        # Add review
        await db.execute(
            text("""
                INSERT INTO reviews (client_id, prestataire_id, rating, comment)
                VALUES (:client_id, :prestataire_id, :rating, :comment)
            """),
            {
                "client_id": client_id,
                "prestataire_id": prestataire_id,
                "rating": rating,
                "comment": comment
            }
        )

        # Update prestataire rating
        await db.execute(
            text("""
                UPDATE prestataire_profiles
                SET rating = (
                    SELECT AVG(rating) FROM reviews WHERE prestataire_id = :prestataire_id
                ),
                reviews_count = (
                    SELECT COUNT(*) FROM reviews WHERE prestataire_id = :prestataire_id
                )
                WHERE id = :prestataire_id
            """),
            {"prestataire_id": prestataire_id}
        )

    return {"message": "Review added successfully."}
