SELECT * FROM vehicles
WHERE ownerId in (
   SELECT id FROM users
   WHERE firstname LIKE $1 or lastname LIKE $1
)
