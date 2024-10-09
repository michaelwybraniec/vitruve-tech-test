import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { athletesRouter } from './controllers/athletes.controller';
import { metricsRouter } from './controllers/metrics.controller';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const port = process.env.PORT || 3000;
const apiPrefix = process.env.API_PREFIX || '/api';

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
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
    components: {
      schemas: {
        Athlete: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            age: {
              type: 'integer',
            },
            team: {
              type: 'string',
            },
          },
        },
        AthleteWithMetrics: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            age: {
              type: 'integer',
            },
            team: {
              type: 'string',
            },
            metrics: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Metric',
              },
            },
          },
        },
        Metric: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            metricType: {
              type: 'string',
              description: 'The type of metric (e.g., speed, strength, stamina)',
            },
            value: {
              type: 'number',
            },
            unit: {
              type: 'string',
              description: 'The unit of measurement (e.g., kg, meters/second)',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
  },
  apis: ['./apps/backend/src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(`${apiPrefix}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use controllers
app.use(`${apiPrefix}/athletes`, athletesRouter);
app.use(`${apiPrefix}/metrics`, metricsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}${apiPrefix}`);
  console.log(`Swagger documentation available at http://localhost:${port}${apiPrefix}/api-docs`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
