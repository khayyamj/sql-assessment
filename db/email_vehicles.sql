SELECT * FROM vehicles
WHERE ownerId in (
   SELECT id FROM users
   WHERE email = $1
)
