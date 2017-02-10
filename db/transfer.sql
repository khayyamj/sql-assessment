UPDATE vehicles
SET ownerId = $2
WHERE vehicleId = $1
RETURNING *;
