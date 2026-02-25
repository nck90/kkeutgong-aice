import { NextResponse } from 'next/server'
import { prisma, getCurrentUser } from '@/lib/prisma'

export async function GET() {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const profile = await prisma.examProfile.findUnique({ where: { userId: user.id } })
    const plan = await prisma.plan.findFirst({
        where: { userId: user.id },
        include: { tasks: true }
    })

    const completedTasks = plan?.tasks.filter(t => t.status === 'DONE').length || 0
    const totalTasks = plan?.tasks.length || 0
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return NextResponse.json({
        data: {
            user: { id: user.id, role: user.role },
            profile,
            plan: {
                id: plan?.id,
                startDate: plan?.startDate,
                examDate: plan?.examDate
            },
            progress: {
                completed: completedTasks,
                total: totalTasks,
                percent: progressPercent
            },
            mistakes: [
                { id: 1, code: 'SCIKIT_NULL', issue: '결측치 처리 누락 (scikit-learn)', frequency: 12, severity: 'HIGH' },
                { id: 2, code: 'PANDAS_ILOC', issue: 'DataFrame 인덱싱/슬라이싱 범위 오류', frequency: 7, severity: 'MEDIUM' },
                { id: 3, code: 'API_SYNTAX', issue: '파라미터 오타 (random_state 등)', frequency: 3, severity: 'LOW' },
            ],
            readyIndex: 68
        },
        meta: { requestId: `req_${Date.now()}` }
    })
}
