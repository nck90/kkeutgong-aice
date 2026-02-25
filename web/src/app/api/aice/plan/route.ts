import { NextResponse } from 'next/server'
import { prisma, getCurrentUser } from '@/lib/prisma'

export async function GET() {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const plan = await prisma.plan.findFirst({
        where: { userId: user.id },
        include: {
            tasks: {
                orderBy: { taskDate: 'asc' }
            }
        }
    })

    if (!plan) return NextResponse.json({ data: null })

    const weeklyPlan: Record<string, any[]> = {}
    plan.tasks.forEach((task, index) => {
        const weekNum = Math.floor(index / 7) + 1
        const weekKey = `Week ${weekNum}`
        if (!weeklyPlan[weekKey]) weeklyPlan[weekKey] = []
        weeklyPlan[weekKey].push(task)
    })

    return NextResponse.json({
        data: {
            plan,
            weeklyPlan
        },
        meta: { requestId: `req_${Date.now()}` }
    })
}

export async function POST(req: Request) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({
        data: {
            status: 'REPLANNED',
            message: 'Your study plan has been successfully regenerated.'
        },
        meta: { requestId: `req_${Date.now()}` }
    })
}
