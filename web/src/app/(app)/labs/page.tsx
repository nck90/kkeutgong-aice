'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Code, Play, Star } from 'lucide-react'

async function fetchLabs() {
    const res = await fetch('/api/aice/labs')
    if (!res.ok) throw new Error('Failed to fetch labs')
    return res.json()
}

export default function LabsPage() {
    const router = useRouter()
    const { data: res, isLoading } = useQuery({ queryKey: ['labs'], queryFn: fetchLabs })

    const startSession = useMutation({
        mutationFn: async (labId: string) => {
            const resp = await fetch('/api/aice/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ labId })
            })
            if (!resp.ok) throw new Error('Failed to start session')
            return resp.json()
        },
        onSuccess: (data) => {
            router.push(`/session/${data.data.sessionId}`)
        }
    })

    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const labs = res?.data || []

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">정규 실습 (Labs)</h2>
                <p className="text-gray-500 mt-2 font-medium">실제 AICE 시험장과 100% 동일한 Jupyter 커널 환경에서 문항을 풀어봅니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {labs.map((lab: any) => (
                    <div key={lab.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                    <Code className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{lab.level}</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-xs font-bold text-gray-700">추천</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {lab.title}
                        </h3>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm text-gray-500 font-medium">환경: {lab.engineType}</span>
                            <span className="text-sm text-gray-500 font-medium">상태: {lab.status}</span>
                        </div>

                        <button
                            onClick={() => startSession.mutate(lab.id)}
                            disabled={startSession.isPending}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                            <Play className="w-4 h-4" />
                            {startSession.isPending ? '환경 준비 중...' : '실습 시작'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
