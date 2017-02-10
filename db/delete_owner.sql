UPDATE vehicles
SET ownerId = null
WHERE ownerId = $2 and vehicleId = $1
RETURNING *;
