import * as dotenv from 'dotenv';
dotenv.config();
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { athletesRouter } from './controllers/athletes.controller';
import { metricsRouter } from './controllers/metrics.controller';
import { serve } from '@hono/node-server';
import { PrismaClient } from '@prisma/client';

const port = Number(process.env.PORT) || 3000;
const apiPrefix = process.env.API_PREFIX || '/';

const app = new OpenAPIHono();

// Initialize Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Middleware to attach Prisma client to context
app.use('*', async (c, next) => {
  (c as any).set('prisma', prisma);
  await next();
});

// Use controllers
app.route(`${apiPrefix}/athletes`, athletesRouter);
app.route(`${apiPrefix}/metrics`, metricsRouter);

// OpenAPI configuration
app.doc('/docs/openapi.json', {
  openapi: '3.1.0',
  info: {
    title: 'Vitruve-tech-test API',
    version: '1.0.0',
    description: 'API for managing athletes and their performance metrics',
  },
  servers: [
    {
      url: `http://localhost:${port}${apiPrefix}`,
      description: 'Development server',
    },
  ],
});

app.get('/', (c) => {
  return c.redirect('/docs');
});

// Swagger UI
app.get('/docs', swaggerUI({ url: '/docs/openapi.json' }));

// Error handling middleware
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API available at http://localhost:${port}${apiPrefix}`);
    console.log(`Swagger UI available at http://localhost:${port}/docs`);
  }
);

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
