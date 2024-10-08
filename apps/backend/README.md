# Backend

This is the backend service for the Vitruve Tech Test project.

## Table of Contents
- [Backend](#backend)
  - [Table of Contents](#table-of-contents)
  - [Quick Setup Guide](#quick-setup-guide)
  - [Database Setup](#database-setup)
  - [Development](#development)
  - [Database Management](#database-management)
  - [Testing](#testing)
  - [Linting](#linting)
  - [Building for Production](#building-for-production)
  - [API Documentation with Swagger](#api-documentation-with-swagger)
    - [Running the API with Swagger](#running-the-api-with-swagger)
    - [Accessing Swagger UI](#accessing-swagger-ui)
    - [Updating Documentation](#updating-documentation)
  - [Using Prisma Studio](#using-prisma-studio)
  - [PostgreSQL Setup and Usage](#postgresql-setup-and-usage)
  - [PostgreSQL GUI: pgAdmin 4](#postgresql-gui-pgadmin-4)
    - [Installation](#installation)
    - [Running pgAdmin 4](#running-pgadmin-4)
    - [Connecting to Your Database](#connecting-to-your-database)
  - [Running the Backend with Docker](#running-the-backend-with-docker)

## Quick Setup Guide

1. Install PostgreSQL:
   ```bash
   brew install postgresql@14
   brew services start postgresql@14
   ```

2. Create the database:
   ```bash
   createdb vitruve_tech_test
   ```

3. Set up the project:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   yarn install
   ```

4. Set up environment variables:
   ```bash
   echo "DATABASE_URL=\"postgresql://your_username@localhost:5432/vitruve_tech_test?schema=public\"" > .env
   ```
   Replace `your_username` with your actual PostgreSQL username.

5. Set up the database and start the server:
   ```bash
   yarn db:setup
   yarn start:backend
   ```

Your backend should now be running and connected to the database!

## Database Setup

We use PostgreSQL as our database and Prisma as our ORM. Follow these steps to set up your database:

1. Ensure you have PostgreSQL installed and running on your machine.

2. Create a new database for this project:
   ```bash
   createdb vitruve_tech_test
   ```

3. In the root directory of the project, create a `.env` file if it doesn't exist already, and add your database URL:
   ```
   DATABASE_URL="postgresql://your_username@localhost:5432/vitruve_tech_test?schema=public"
   ```
   Replace `your_username` with your actual PostgreSQL username.

4. Run the database setup command from the root of the project:
   ```bash
   yarn db:setup
   ```
   This command will generate the Prisma client, run migrations, and seed the database with initial data.

## Development

To start the backend in development mode, run from the root of the project:
```bash
yarn start:backend
```

## Database Management

- To generate Prisma client after schema changes: `yarn prisma:generate`
- To create and apply new migrations: `yarn prisma:migrate`
- To open Prisma Studio (GUI for database): `yarn prisma:studio`
- To seed the database: `yarn prisma:seed`

## Testing

Run unit tests:
```bash
yarn test:backend
```

Run end-to-end tests:
```bash
yarn e2e:backend
```

## Linting

To lint the backend code:
```bash
yarn lint:backend
```

## Building for Production

To build the backend for production:
```bash
yarn build:backend
```

Remember to run all these commands from the root of the NX monorepo, not from the backend directory itself.

## API Documentation with Swagger

This project uses Swagger for API documentation. Swagger provides a user-friendly interface to explore and test the API endpoints.

### Running the API with Swagger

To start the server with Swagger documentation, run the following command:
```bash
yarn start:swagger
```

### Accessing Swagger UI

Once the server is running, you can access the Swagger UI at:
http://localhost:3000/api-docs

### Updating Documentation

The API documentation is generated from annotations in the controller files. To update the documentation:

1. Locate the controller files in `apps/backend/controllers/`
2. Add or modify the Swagger annotations above each route handler
3. Restart the server to see the changes reflected in the Swagger UI

Example of a Swagger annotation:
```typescript
/**
 * @swagger
 * /api/athletes:
 *   get:
 *     summary: Retrieve a list of athletes
 *     tags: [Athletes]
 *     responses:
 *       200:
 *         description: A list of athletes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Athlete'
 */
```

For more information on Swagger annotations, refer to the [Swagger Documentation](https://swagger.io/docs/).

## Using Prisma Studio

Prisma Studio provides a visual interface for viewing and editing your database. To use Prisma Studio:

1. Navigate to your backend directory:
   ```
   cd apps/backend
   ```

2. Run Prisma Studio:
   ```
   yarn prisma studio
   ```

3. Open your web browser and go to http://localhost:5555

## PostgreSQL Setup and Usage

This project uses PostgreSQL as its database. Here are some useful commands:

- Check if PostgreSQL is running:
  ```bash
  brew services list | grep postgresql
  ```

- Start PostgreSQL service:
  ```bash
  brew services start postgresql@14
  ```

- Stop PostgreSQL service:
  ```bash
  brew services stop postgresql@14
  ```

- Connect to a specific database:
  ```bash
  psql -d vitruve_tech_test
  ```

For more detailed PostgreSQL setup and troubleshooting, please refer to the project's main documentation.

## PostgreSQL GUI: pgAdmin 4

pgAdmin 4 is a feature-rich open-source administration and development platform for PostgreSQL.

### Installation

To install pgAdmin 4 on macOS using Homebrew:
```bash
brew install --cask pgadmin4
```

### Running pgAdmin 4

1. Open the Applications folder in Finder.
2. Locate and double-click on "pgAdmin 4.app" to launch it.

### Connecting to Your Database

1. When pgAdmin 4 opens, it may prompt you to set a master password. Set this password and remember it.
2. In the left sidebar, right-click on "Servers" and select "Create" > "Server".
3. In the "General" tab, give your connection a name (e.g., "Local PostgreSQL").
4. Switch to the "Connection" tab and enter these details:
   - Host name/address: localhost
   - Port: 5432
   - Maintenance database: postgres
   - Username: your_username (your system username)
   - Password: (leave blank if you haven't set one, or enter your password if you have)
5. Click "Save" to connect to your PostgreSQL server.

You should now see your server in the left sidebar. You can expand it to view and manage your databases, including the one for this project.

## Running the Backend with Docker

To run the backend services (API and database):

```bash
docker-compose up --build
```

This will start both the backend API and the PostgreSQL database.

To run only the database (for local development):

```bash
docker-compose up db
```

Then you can run the backend locally with:

```bash
npm run start:dev
```

Make sure to set up your .env file with the correct configuration before running the services.
