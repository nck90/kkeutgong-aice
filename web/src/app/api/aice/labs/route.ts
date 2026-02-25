import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const labs = await prisma.lab.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            level: true,
            engineType: true,
            status: true
        }
    })

    return NextResponse.json({
        data: labs,
        meta: { requestId: `req_${Date.now()}` }
    })
}
