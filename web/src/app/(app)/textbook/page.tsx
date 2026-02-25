'use client'

import { useQuery } from '@tanstack/react-query'
import { BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react'

async function fetchTextbook() {
    const res = await fetch('/api/aice/textbook')
    if (!res.ok) throw new Error('Failed to fetch textbook')
    return res.json()
}

export default function TextbookPage() {
    const { data: res, isLoading } = useQuery({
        queryKey: ['textbook'],
        queryFn: fetchTextbook
    })

    if (isLoading) {
        return (
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const concepts = res?.data || []

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">AICE 개념장</h2>
                    <p className="text-gray-500 mt-2 font-medium">시험에 100% 출제되는 DataFrame, Scikit-Learn 핵심 개념</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    학습 진행률 2/15
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* TOC Sidebar */}
                <div className="col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            목차
                        </h3>
                        <div className="space-y-2">
                            {concepts.map((c: any, i: number) => (
                                <button
                                    key={c.id}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex justify-between items-center ${i === 0
                                            ? 'bg-primary/10 text-primary font-bold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="truncate">{c.title}</span>
                                    {i === 0 && <ChevronRight className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="col-span-1 md:col-span-2">
                    <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm prose prose-blue max-w-none">
                        <div className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold mb-6">
                            {concepts[0]?.category}
                        </div>

                        <pre className="bg-[#1E1E1E] text-[#D4D4D4] p-6 rounded-2xl overflow-x-auto text-sm font-mono mt-0 shadow-inner border border-gray-800 leading-relaxed">
                            <code>{concepts[0]?.content.trim()}</code>
                        </pre>

                        <div className="mt-8 flex justify-end">
                            <button className="px-6 py-3 bg-gray-900 text-white hover:bg-black rounded-xl font-bold transition-colors">
                                이해했어요 (다음으로)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
