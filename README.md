Product Catalog Backend

Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- TypeScript

Features

- Product listing API
- Category-based filtering
- Cursor-based pagination
- Optimized database indexes
- 200,000 seeded products

Setup

npm install

Create ".env"

DATABASE_URL=your_neon_connection_string

Run migrations:

npx prisma migrate deploy

Generate Prisma Client:

npx prisma generate

Seed database:

npm run seed

Start server:

npm run dev

Endpoints

Get Products

GET /products

Filter by Category

GET /products?category=Electronics

Pagination

GET /products?pageSize=20

Use returned "nextCursor":

GET /products?pageSize=20&cursor=<cursor>