import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const athlete1 = await prisma.athlete.create({
    data: {
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      metrics: {
        create: [
          { metricType: 'Speed', value: 9.8, unit: 'm/s' },
          { metricType: 'Strength', value: 150, unit: 'kg' },
        ],
      },
    },
  })

  const athlete2 = await prisma.athlete.create({
    data: {
      name: 'Jane Smith',
      age: 28,
      team: 'Team B',
      metrics: {
        create: [
          { metricType: 'Endurance', value: 45, unit: 'min' },
          { metricType: 'Flexibility', value: 25, unit: 'cm' },
        ],
      },
    },
  })

  console.log({ athlete1, athlete2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })