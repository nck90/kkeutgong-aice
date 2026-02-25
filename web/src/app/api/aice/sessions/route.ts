import { NextResponse } from 'next/server'
import { prisma, getCurrentUser } from '@/lib/prisma'

export async function POST(req: Request) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    try {
        const { labId, level = 'ASSOCIATE', mode = 'PRACTICE' } = await req.json()

        const session = await prisma.session.create({
            data: {
                userId: user.id,
                labId,
                level,
                engineType: 'JUPYTER',
                policyId: 'plc_default',
                mode,
                status: 'CREATED'
            }
        })

        return NextResponse.json({
            data: {
                sessionId: session.id,
                status: session.status,
                message: 'Jupyter Kernel initialized.'
            },
            meta: { requestId: `req_${Date.now()}` }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    }
}
