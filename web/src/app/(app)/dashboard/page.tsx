'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, AlertTriangle, TrendingUp, BarChart3, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

async function fetchDashboard() {
    const res = await fetch('/api/aice/dashboard')
    if (!res.ok) throw new Error('Failed to fetch dashboard')
    return res.json()
}

export default function DashboardPage() {
    const { data: res, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: fetchDashboard
    })

    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const { data } = res || {}

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">좋은 아침입니다, 수험생 님👋</h2>
                    <p className="text-gray-500 mt-2 font-medium">AICE Associate 시험이 14일 남았습니다. 목표 달성률 68%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Progress Card */}
                <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0"></div>

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">14일 커리큘럼 진도율</h3>
                    </div>

                    <div className="flex items-end gap-6 mb-4 relative z-10">
                        <span className="text-6xl font-black text-primary tracking-tighter">{data?.progress?.percent}%</span>
                        <span className="text-gray-400 font-bold mb-2">{data?.progress?.completed} / {data?.progress?.total} Tasks 완료</span>
                    </div>

                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden relative z-10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data?.progress?.percent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary to-[#5F3DC4] rounded-full"
                        />
                    </div>

                    <div className="mt-8 flex gap-4 relative z-10">
                        <Link href="/plan" className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-colors">
                            플랜 이어서 학습하기
                        </Link>
                    </div>
                </div>

                {/* Ready Index Card */}
                <div className="bg-gradient-to-br from-primary to-[#5F3DC4] p-8 rounded-3xl border border-primary/20 shadow-lg shadow-primary/10 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
                    <div>
                        <div className="flex items-center justify-between mb-2 relative z-10">
                            <h3 className="text-white/80 font-bold">합격 가능성 (Ready Index)</h3>
                            <BarChart3 className="w-5 h-5 opacity-50" />
                        </div>
                        <div className="text-6xl font-black tracking-tighter relative z-10">{data?.readyIndex}<span className="text-2xl text-white/50">/100</span></div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-medium mt-6 relative z-10">
                        현재 페이스라면 무난히 합격 가능선(80점 대비 68점 수준)에 도달할 수 있습니다.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mistakes & Weakness */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">취약 파트 분석</h3>
                    </div>

                    <div className="space-y-4">
                        {data?.mistakes?.map((m: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-red-50/50 hover:border-red-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${m.severity === 'HIGH' ? 'bg-red-500' : 'bg-amber-500'}`} />
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 mb-1">{m.code}</div>
                                        <div className="text-sm font-bold text-gray-900">{m.issue}</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 shadow-sm">
                                    {m.frequency}회 발생
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bandit Notifications */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Bandit Review 추천</h3>
                    </div>
                    <div className="text-gray-500 text-sm font-medium leading-relaxed bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                        학습 망각 곡선을 분석한 결과, <strong className="text-amber-600">오늘 오후 2시 30분</strong>에 Pandas 결측치 제어 실습을 복습하는 것이 성적 향상에 가장 효과적입니다.
                        <div className="mt-4">
                            <button className="px-4 py-2 bg-amber-100 text-amber-700 hover:bg-amber-200 rounded-xl text-sm font-bold transition-colors">
                                추천 실습 복습하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
