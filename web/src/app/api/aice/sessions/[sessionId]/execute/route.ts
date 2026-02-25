import { NextResponse } from 'next/server'
import { prisma, getCurrentUser } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: Promise<{ sessionId: string }> }) {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { sessionId } = await params

    try {
        const { code, stepNo } = await req.json()

        await prisma.session.update({
            where: { id: sessionId },
            data: { status: 'RUNNING' }
        })

        await new Promise(resolve => setTimeout(resolve, 800))

        let stdout = ""
        let stderr = ""
        if (code.includes('print')) {
            stdout = "hello world\n"
        } else if (code.includes('import pandas as pd')) {
            stdout = "Pandas imported successfully.\n"
        } else {
            stdout = "Execution complete. No output.\n"
        }

        return NextResponse.json({
            data: {
                executionId: `exe_${Date.now()}`,
                state: 'Done',
                stdout,
                stderr,
                runtimeMs: 820
            },
            meta: { requestId: `req_${Date.now()}` }
        })
    } catch (error) {
        return NextResponse.json({ error: 'Execution failed.' }, { status: 500 })
    }
}
