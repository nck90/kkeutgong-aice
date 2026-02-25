import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Create a dummy User
    const user = await prisma.user.create({
        data: {
            role: 'USER',
        }
    })

    // 2. Create Exam Profile
    const profile = await prisma.examProfile.create({
        data: {
            userId: user.id,
            level: 'ASSOCIATE',
            examDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days later
            targetType: 'HIGH_SCORE'
        }
    })

    // 3. Create a Plan
    const plan = await prisma.plan.create({
        data: {
            userId: user.id,
            examProfileId: profile.id,
            startDate: new Date(),
            examDate: profile.examDate,
        }
    })

    // 4. Create Plan Tasks (14 Days)
    const tasks = []
    for (let i = 1; i <= 14; i++) {
        const d = new Date()
        d.setDate(d.getDate() + (i - 1))

        tasks.push({
            planId: plan.id,
            taskDate: d,
            taskType: i % 4 === 0 ? 'MOCK' : (i % 2 === 0 ? 'LAB' : 'DRILL'),
            status: i < 3 ? 'DONE' : (i === 3 ? 'TODO' : 'TODO'),
            estMinutes: i % 4 === 0 ? 90 : 45
        })
    }
    await prisma.planTask.createMany({ data: tasks })

    // 5. Create basic Labs
    const lab1 = await prisma.lab.create({
        data: {
            title: 'AICE Associate Tabular Data Analysis',
            level: 'ASSOCIATE',
            engineType: 'JUPYTER',
            status: 'PUBLISHED'
        }
    })

    const lab2 = await prisma.lab.create({
        data: {
            title: 'AICE Associate Scikit-Learn Modeling',
            level: 'ASSOCIATE',
            engineType: 'JUPYTER',
            status: 'PUBLISHED'
        }
    })

    console.log('Seeded User ID:', user.id)
    console.log('Seed data inserted successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
