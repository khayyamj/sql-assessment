DELETE FROM vehicles
WHERE vehicleId = $1
RETURNING *;
