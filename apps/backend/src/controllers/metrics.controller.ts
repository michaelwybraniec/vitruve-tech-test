import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { PrismaClient } from '@prisma/client';

const metricsRouter = new OpenAPIHono()
const prisma = new PrismaClient();

const MetricSchema = z.object({
  id: z.string(),
  athleteId: z.string(),
  metricType: z.string(),
  value: z.number(),
  unit: z.string(),
});

const MetricInputSchema = MetricSchema.omit({ id: true, athleteId: true });

metricsRouter.openapi(
  createRoute({
    method: 'post',
    path: '/{id}/metrics',
    summary: 'Create Metric',
    description: 'Create a new performance metric for an athlete',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'The unique identifier of the athlete'
      },
      {
        name: 'metricType',
        in: 'query',
        required: false,
        schema: { type: 'string' },
        description: 'Filter metrics by type (e.g., "speed", "weight", "height")'
      }
    ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: MetricInputSchema,
            example: {
              metricType: 'speed',
              value: 9.8,
              unit: 'm/s'
            }
          }
        }
      }
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: MetricSchema,
            example: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              athleteId: '789e0123-e45b-67d8-a901-234567890000',
              metricType: 'speed',
              value: 9.8,
              unit: 'm/s'
            }
          }
        },
        description: 'Created metric',
      },
      404: {
        description: 'Athlete not found'
      }
    },
    tags: ['Metrics']
  }),
  async (c) => {
    const id = c.req.param('id');
    const { metricType, value, unit } = c.req.valid('json');
    try {
      const metric = await prisma.performanceMetric.create({
        data: {
          athleteId: id,
          metricType,
          value,
          unit
        }
      });
      return c.json(metric, 201);
    } catch (error) {
      return c.json({ error: 'Athlete not found' }, 404);
    }
  }
);

metricsRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}/metrics',
    summary: 'Get Metrics',
    description: 'Retrieve performance metrics for an athlete',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' }
      },
      {
        name: 'metricType',
        in: 'query',
        required: false,
        schema: { type: 'string' }
      }
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.array(MetricSchema)
          }
        },
        description: 'List of metrics',
      },
      404: {
        description: 'Athlete not found'
      }
    },
    tags: ['Metrics']
  }),
  async (c) => {
    const id = c.req.param('id');
    const metricType = c.req.query('metricType');
    try {
      const metrics = await prisma.performanceMetric.findMany({
        where: {
          athleteId: id,
          ...(metricType && { metricType })
        }
      });
      return c.json(metrics);
    } catch (error) {
      return c.json({ error: 'Athlete not found' }, 404);
    }
  }
);

export { metricsRouter }