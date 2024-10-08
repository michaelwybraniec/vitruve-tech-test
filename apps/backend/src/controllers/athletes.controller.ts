import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /athletes:
 *   post:
 *     summary: Create a new athlete profile
 *     tags: [Athletes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - team
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               team:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created athlete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Athlete'
 */
router.post('/', async (req, res) => {
  const { name, age, team } = req.body;
  const athlete = await prisma.athlete.create({
    data: { name, age, team }
  });
  res.json(athlete);
});

/**
 * @swagger
 * /athletes:
 *   get:
 *     summary: Retrieve a list of all athletes
 *     tags: [Athletes]
 *     responses:
 *       200:
 *         description: List of athletes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Athlete'
 */
router.get('/', async (req, res) => {
  const athletes = await prisma.athlete.findMany();
  res.json(athletes);
});

/**
 * @swagger
 * /athletes/{id}:
 *   get:
 *     summary: Get details and performance metrics for a specific athlete
 *     tags: [Athletes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Athlete details with metrics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AthleteWithMetrics'
 *       404:
 *         description: Athlete not found
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const athlete = await prisma.athlete.findUnique({
    where: { id },
    include: { metrics: true }
  });
  if (athlete) {
    res.json(athlete);
  } else {
    res.status(404).json({ error: 'Athlete not found' });
  }
});

/**
 * @swagger
 * /athletes/{id}:
 *   put:
 *     summary: Update athlete information
 *     tags: [Athletes]
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
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               team:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated athlete
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Athlete'
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, team } = req.body;
  const updatedAthlete = await prisma.athlete.update({
    where: { id },
    data: { name, age, team }
  });
  res.json(updatedAthlete);
});

/**
 * @swagger
 * /athletes/{id}:
 *   delete:
 *     summary: Delete an athlete and their performance metrics
 *     tags: [Athletes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Athlete successfully deleted
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.athlete.delete({
    where: { id }
  });
  res.status(204).send();
});

export const athletesRouter: Router = router;