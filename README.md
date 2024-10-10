# vitruve-tech-test
Welcome to "vitruve-tech-test", a wonderful "ONE-FRONT" full-stack webapp for Vitruve in Madrid! 💃 🇪🇸

## README IN PROGRES

## Prisma Setup and Usage

This project uses Prisma as an ORM for database operations. Follow these steps to set up and use Prisma:

1. Navigate to the backend directory:
   ```
   cd apps/backend
   ```

2. Ensure your `prisma/schema.prisma` file contains the following:
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model Athlete {
     id        String   @id @default(uuid())
     name      String
     age       Int
     team      String
     metrics   PerformanceMetric[]
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }

   model PerformanceMetric {
     id         String   @id @default(uuid())
     athleteId  String
     athlete    Athlete  @relation(fields: [athleteId], references: [id])
     metricType String
     value      Float
     unit       String
     timestamp  DateTime @default(now())
   }
   ```

3. Set up your database connection by adding the `DATABASE_URL` to your `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name?schema=public"
   ```
   Replace `username`, `password`, and `your_database_name` with your actual database credentials.

4. Generate Prisma Client:
   ```
   npx prisma generate
   ```

5. Run database migrations:
   ```
   npx prisma migrate dev
   ```

6. To open Prisma Studio (a GUI for your database):
   ```
   npx prisma studio
   ```

For more information on using Prisma, refer to the [Prisma documentation](https://www.prisma.io/docs/).

## Backend Development

Our backend is set up as part of an NX monorepo. Here are the key commands for backend development:

### Starting the Backend

To start the backend in development mode:

```bash
npm run start:backend
```

### Building the Backend

To build the backend for production:

```bash
npm run build:backend
```

### Testing the Backend

Run unit tests:

```bash
npm run test:backend
```

Run end-to-end tests:

```bash
npm run e2e:backend
```

### Linting the Backend

To lint the backend code:

```bash
npm run lint:backend
```

### Database Operations

We use Prisma for database management. Here are the key database-related commands:

- Generate Prisma client: `npm run prisma:generate`
- Run Prisma migrations: `npm run prisma:migrate`
- Open Prisma Studio: `npm run prisma:studio`
- Seed the database: `npm run prisma:seed`
- Set up the database (generate, migrate, seed): `npm run db:setup`

For more detailed information about the backend, please refer to the README in the `apps/backend` directory.
