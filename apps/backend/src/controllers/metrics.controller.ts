import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /athletes/{id}/metrics:
 *   post:
 *     summary: Add a new performance metric
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - metricType
 *               - value
 *               - unit
 *             properties:
 *               metricType:
 *                 type: string
 *               value:
 *                 type: number
 *               unit:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created metric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PerformanceMetric'
 */
router.post('/:id/metrics', async (req, res) => {
  const { id } = req.params;
  const { metricType, value, unit } = req.body;
  const metric = await prisma.performanceMetric.create({
    data: {
      athleteId: id,
      metricType,
      value,
      unit
    }
  });
  res.json(metric);
});

/**
 * @swagger
 * /athletes/{id}/metrics:
 *   get:
 *     summary: Get all metrics for an athlete
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: metricType
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PerformanceMetric'
 */
router.get('/:id/metrics', async (req, res) => {
  const { id } = req.params;
  const { metricType } = req.query;
  const metrics = await prisma.performanceMetric.findMany({
    where: {
      athleteId: id,
      ...(metricType && { metricType: metricType as string })
    }
  });
  res.json(metrics);
});

export const metricsRouter: Router = router;