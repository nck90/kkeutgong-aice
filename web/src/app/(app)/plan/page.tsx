'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

async function fetchPlan() {
    const res = await fetch('/api/aice/plan')
    if (!res.ok) throw new Error('Failed to fetch plan')
    return res.json()
}

export default function PlanPage() {
    const { data: res, isLoading } = useQuery({
        queryKey: ['plan'],
        queryFn: fetchPlan
    })

    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const weeklyPlan = res?.data?.weeklyPlan || {}

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">14일 커스텀 플랜</h2>
                <p className="text-gray-500 mt-2 font-medium">AICE Associate 시험일까지 AI가 분배한 최적의 학습 일정입니다.</p>
            </div>

            <div className="space-y-12">
                {Object.entries(weeklyPlan).map(([week, tasks]: [string, any]) => (
                    <section key={week}>
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm">{week}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            {tasks.map((task: any, idx: number) => {
                                const dateObj = new Date(task.taskDate)
                                const isDone = task.status === 'DONE'
                                const isToday = task.status === 'TODO' && idx === 2

                                return (
                                    <div
                                        key={task.id}
                                        className={`p-4 rounded-2xl border transition-all ${isDone
                                                ? 'bg-gray-50 border-gray-100 opacity-70'
                                                : isToday
                                                    ? 'bg-white border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20 scale-105 z-10'
                                                    : 'bg-white border-gray-100 shadow-sm'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-bold text-gray-400">
                                                {dateObj.getMonth() + 1}/{dateObj.getDate()}
                                            </span>
                                            {isDone ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            ) : isToday ? (
                                                <div className="flex items-center gap-1 text-[10px] font-black tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                                                    Today
                                                </div>
                                            ) : (
                                                <Circle className="w-5 h-5 text-gray-200" />
                                            )}
                                        </div>

                                        <div className={`text-xs font-bold mb-2 inline-block px-2 py-1 rounded-md ${task.taskType === 'MOCK' ? 'bg-amber-100 text-amber-700' :
                                                task.taskType === 'LAB' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-purple-100 text-purple-700'
                                            }`}>
                                            {task.taskType}
                                        </div>

                                        <div className="text-sm font-bold text-gray-900 mt-2">
                                            {task.taskType === 'MOCK' ? '모의고사' :
                                                task.taskType === 'LAB' ? 'Jupyter 실습' : '핵심 개념 학습'}
                                        </div>

                                        <div className="flex items-center gap-1 mt-4 text-xs font-medium text-gray-400">
                                            <Clock className="w-3 h-3" />
                                            {task.estMinutes}분 예상
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
