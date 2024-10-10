import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { PrismaClient } from '@prisma/client';

const athletesRouter = new OpenAPIHono()
const prisma = new PrismaClient();

const AthleteSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().int().positive(),
  team: z.string()
});

const AthleteInputSchema = AthleteSchema.omit({ id: true });

const MetricSchema = z.object({
  id: z.string(),
  metricType: z.string(),
  value: z.number(),
  unit: z.string()
});

athletesRouter.openapi(
  createRoute({
    method: 'post',
    path: '/',
    summary: 'Create Athlete',
    description: 'Create a new athlete with the provided information',
    request: {
      body: {
        content: {
          'application/json': {
            schema: AthleteInputSchema,
            example: {
              name: 'John Doe',
              age: 25,
              team: 'Red Team'
            }
          }
        }
      }
    },
    responses: {
      201: {
        content: {
          'application/json': {
            schema: AthleteSchema,
            example: {
              id: '123e4567-e89b-12d3-a456-426614174000',
              name: 'John Doe',
              age: 25,
              team: 'Red Team'
            }
          }
        },
        description: 'Created athlete',
      }
    },
    tags: ['Athletes']
  }),
  async (c) => {
    const { name, age, team } = c.req.valid('json');
    const athlete = await prisma.athlete.create({
      data: { name, age, team }
    });
    return c.json(athlete, 201);
  }
);

athletesRouter.openapi(
  createRoute({
    method: 'get',
    path: '/',
    parameters: [
      {
        name: 'team',
        in: 'query',
        required: false,
        schema: { type: 'string' },
        description: 'Filter athletes by team'
      },
      {
        name: 'page',
        in: 'query',
        required: false,
        schema: { type: 'integer', minimum: 1, default: 1 },
        description: 'Page number for pagination'
      },
      {
        name: 'limit',
        in: 'query',
        required: false,
        schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
        description: 'Number of items per page'
      },
      {
        name: 'sort',
        in: 'query',
        required: false,
        schema: { type: 'string', enum: ['name', 'age', 'team'] },
        description: 'Sort athletes by field'
      },
      {
        name: 'order',
        in: 'query',
        required: false,
        schema: { type: 'string', enum: ['asc', 'desc'], default: 'asc' },
        description: 'Sort order (ascending or descending)'
      }
    ],
    summary: 'List Athletes',
    description: 'Retrieve a list of all athletes',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.array(AthleteSchema)
          }
        },
        description: 'List of athletes',
      },
      400: {
        description: 'Bad request'
      }
    },
    tags: ['Athletes']
  }),
  async (c) => {
    try {
      const { team, page = '1', limit = '20', sort, order = 'asc' } = c.req.query();
      const skip = (Number(page) - 1) * Number(limit);
      
      const where = team ? { team } : {};
      const orderBy = sort ? { [sort]: order } : undefined;

      const athletes = await prisma.athlete.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy,
      });
      
      return c.json(athletes);
    } catch (error) {
      console.error('Error fetching athletes:', error);
      return c.json({ error: 'An error occurred while fetching athletes' }, 500);
    }
  }
);

athletesRouter.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    summary: 'Get Athlete Details',
    description: 'Retrieve athlete details with performance metrics',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'The unique identifier of the athlete'
      }
    ],
    responses: {
      200: {
        content: {
          'application/json': {
            schema: AthleteSchema.extend({
              metrics: z.array(MetricSchema)
            })
          }
        },
        description: 'Athlete details with performance metrics',
      },
      404: {
        description: 'Athlete not found'
      }
    },
    tags: ['Athletes']
  }),
  async (c) => {
    const id = c.req.param('id');
    const athlete = await prisma.athlete.findUnique({
      where: { id },
      include: { metrics: true }
    });
    if (athlete) {
      return c.json(athlete);
    } else {
      return c.json({ error: 'Athlete not found' }, 404);
    }
  }
);

athletesRouter.openapi(
  createRoute({
    method: 'put',
    path: '/{id}',
    summary: 'Update Athlete',
    description: 'Update an existing athlete with the provided information',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' }
      }
    ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: AthleteInputSchema.partial()
          }
        }
      }
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: AthleteSchema
          }
        },
        description: 'Updated athlete',
      },
      404: {
        description: 'Athlete not found'
      }
    },
    tags: ['Athletes']
  }),
  async (c) => {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    try {
      const updatedAthlete = await prisma.athlete.update({
        where: { id },
        data
      });
      return c.json(updatedAthlete);
    } catch (error) {
      return c.json({ error: 'Athlete not found' }, 404);
    }
  }
);

athletesRouter.openapi(
  createRoute({
    method: 'delete',
    path: '/{id}',
    summary: 'Delete Athlete',
    description: 'Delete an athlete by ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' }
      }
    ],
    responses: {
      204: {
        description: 'Athlete deleted successfully'
      },
      404: {
        description: 'Athlete not found'
      }
    },
    tags: ['Athletes']
  }),
  async (c) => {
    const id = c.req.param('id');
    try {
      await prisma.athlete.delete({
        where: { id }
      });
      return c.text('', 204);
    } catch (error) {
      return c.json({ error: 'Athlete not found' }, 404);
    }
  }
);

export { athletesRouter }