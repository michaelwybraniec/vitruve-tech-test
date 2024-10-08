# Org

# vitruve-tech-test
Welcome to "vitruve-tech-test", a wonderful "ONE-FRONT" full-stack webapp for Vitruve in Madrid! 💃 🇪🇸

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/FEXwcxNyDV)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev vitruve-tech-test
```

To create a production bundle:

```sh
npx nx build vitruve-tech-test
```

To see all available targets to run for a project, run:

```sh
npx nx show project vitruve-tech-test
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

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
