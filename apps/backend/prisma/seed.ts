import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const athletes = [
    {
      name: 'John Doe',
      age: 25,
      team: 'Team A',
      metrics: [
        { metricType: 'Speed', value: 9.8, unit: 'm/s' },
        { metricType: 'Strength', value: 150, unit: 'kg' },
        { metricType: 'Endurance', value: 40, unit: 'min' },
      ],
    },
    {
      name: 'Jane Smith',
      age: 28,
      team: 'Team B',
      metrics: [
        { metricType: 'Endurance', value: 45, unit: 'min' },
        { metricType: 'Flexibility', value: 25, unit: 'cm' },
        { metricType: 'Speed', value: 8.5, unit: 'm/s' },
      ],
    },
    {
      name: 'Mike Johnson',
      age: 22,
      team: 'Team C',
      metrics: [
        { metricType: 'Strength', value: 180, unit: 'kg' },
        { metricType: 'Speed', value: 10.2, unit: 'm/s' },
        { metricType: 'Agility', value: 8.5, unit: 'sec' },
      ],
    },
    {
      name: 'Emily Brown',
      age: 26,
      team: 'Team A',
      metrics: [
        { metricType: 'Flexibility', value: 30, unit: 'cm' },
        { metricType: 'Endurance', value: 50, unit: 'min' },
        { metricType: 'Balance', value: 9, unit: 'points' },
      ],
    },
    {
      name: 'Alex Wilson',
      age: 24,
      team: 'Team B',
      metrics: [
        { metricType: 'Speed', value: 9.5, unit: 'm/s' },
        { metricType: 'Agility', value: 7.8, unit: 'sec' },
        { metricType: 'Strength', value: 140, unit: 'kg' },
      ],
    },
  ]

  for (const athleteData of athletes) {
    const athlete = await prisma.athlete.create({
      data: {
        name: athleteData.name,
        age: athleteData.age,
        team: athleteData.team,
        metrics: {
          create: athleteData.metrics,
        },
      },
    })
    console.log(`Created athlete: ${athlete.name}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })