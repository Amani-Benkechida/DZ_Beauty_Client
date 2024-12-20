from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from deps import get_db

router = APIRouter(prefix="/loyalty-program", tags=["LoyalityProgram"])

@router.post("/add-points/")
async def add_points(
    client_id: int,
    points: int,
    db: AsyncSession = Depends(get_db)
):
    if points <= 0:
        raise HTTPException(status_code=400, detail="Points must be greater than zero.")

    async with db.begin():
        # Check if client exists in loyalty_program
        client_check = await db.execute(
            text("SELECT id FROM loyalty_program WHERE client_id = :client_id"),
            {"client_id": client_id}
        )
        if not client_check.fetchone():
            # If client is not in loyalty_program, create an entry
            await db.execute(
                text("""
                    INSERT INTO loyalty_program (client_id, points)
                    VALUES (:client_id, :points)
                """),
                {"client_id": client_id, "points": points}
            )
        else:
            # If client exists, update points
            await db.execute(
                text("""
                    UPDATE loyalty_program
                    SET points = points + :points, last_updated = CURRENT_TIMESTAMP
                    WHERE client_id = :client_id
                """),
                {"client_id": client_id, "points": points}
            )

    return {"message": f"{points} points added to client {client_id}."}


@router.post("/redeem-points/")
async def redeem_points(
    client_id: int,
    points: int,
    db: AsyncSession = Depends(get_db)
):
    if points <= 0:
        raise HTTPException(status_code=400, detail="Points must be greater than zero.")

    async with db.begin():
        # Check client's points
        result = await db.execute(
            text("SELECT points FROM loyalty_program WHERE client_id = :client_id"),
            {"client_id": client_id}
        )
        client_points = result.scalar()
        if client_points is None:
            raise HTTPException(status_code=404, detail="Client not enrolled in loyalty program.")
        if client_points < points:
            raise HTTPException(status_code=400, detail="Not enough points to redeem.")

        # Deduct points
        await db.execute(
            text("""
                UPDATE loyalty_program
                SET points = points - :points, last_updated = CURRENT_TIMESTAMP
                WHERE client_id = :client_id
            """),
            {"client_id": client_id, "points": points}
        )

    return {"message": f"{points} points redeemed for client {client_id}."}
