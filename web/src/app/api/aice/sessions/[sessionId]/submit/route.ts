import { NextResponse } from 'next/server'
import { prisma, getCurrentUser } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: Promise<{ sessionId: string }> }) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { sessionId } = await params

    try {
        const { answers, stepNo } = await req.json()

        const result = Math.random() > 0.3 ? 'PASS' : 'FAIL'
        const score = result === 'PASS' ? 10 : 0
        const errorCodes = result === 'FAIL' ? JSON.stringify(['ANSWER_VAR_TYPE_MISMATCH']) : '[]'

        const submission = await prisma.stepSubmission.create({
            data: {
                sessionId,
                stepNo: stepNo || 1,
                attemptNo: 1,
                result,
                score,
                errorCodes,
                runtimeMs: 1500
            }
        })

        return NextResponse.json({
            data: {
                result,
                score,
                feedback: { summary: result === 'PASS' ? 'Great job!' : 'Type mismatch in answer04_1' },
            },
            meta: { requestId: `req_${Date.now()}` }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Submit failed.' }, { status: 500 })
    }
}
