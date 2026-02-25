import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react'
import { getChaptersByLevel } from '@/shared/data/curriculum'
import { useAiceStore } from '@/shared/model/store'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

const LEVEL_CONFIG = {
    JUNIOR: {
        label: 'AICE Junior',
        color: 'from-emerald-500 to-teal-600',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
        description: 'No-Code GUI | AI 원리 + 실습 | 중고등 수준',
    },
    BASIC: {
        label: 'AICE Basic',
        color: 'from-blue-500 to-indigo-600',
        badge: 'bg-blue-50 text-blue-700 border-blue-200',
        buttonClass: 'bg-blue-600 hover:bg-blue-700',
        description: 'No-Code AutoML | 업무 적용 | 비전공 성인 수준',
    },
    ASSOCIATE: {
        label: 'AICE Associate',
        color: 'from-violet-500 to-purple-700',
        badge: 'bg-violet-50 text-violet-700 border-violet-200',
        buttonClass: 'bg-violet-600 hover:bg-violet-700',
        description: 'Python Jupyter | EDA/전처리/모델링/평가 코딩',
    },
}

export function AiceRoadmapPage() {
    const { completedStepIds } = useAiceStore()

    const levels = (['JUNIOR', 'BASIC', 'ASSOCIATE'] as const)

    return (
        <div className="max-w-5xl mx-auto space-y-10 py-8 px-4">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">AICE 학습 로드맵</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">전체 커리큘럼 – 개념부터 실전 문항까지</h1>
                <p className="mt-2 text-slate-500">각 챕터는 개념 학습 → 실제 기출 유형 문항 순서로 구성됩니다. 챕터의 모든 스텝을 완료하면 해당 문항을 풀 수 있습니다.</p>
            </div>

            {levels.map((level) => {
                const config = LEVEL_CONFIG[level]
                const chapters = getChaptersByLevel(level)
                const totalSteps = chapters.reduce((acc, ch) => acc + ch.steps.length, 0)
                const doneSteps = chapters.reduce(
                    (acc, ch) => acc + ch.steps.filter((s) => completedStepIds.includes(s.id)).length,
                    0
                )
                const progressPct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0

                return (
                    <section key={level} className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
                        {/* Level Header */}
                        <div className={cn('bg-gradient-to-r p-6 text-white', config.color)}>
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <div>
                                    <h2 className="text-2xl font-bold">{config.label}</h2>
                                    <p className="text-white/80 text-sm mt-1">{config.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-white/70 text-sm">전체 진행률</div>
                                    <div className="text-2xl font-bold">{progressPct}%</div>
                                    <div className="text-white/70 text-xs">{doneSteps} / {totalSteps} 스텝 완료</div>
                                </div>
                            </div>

                            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                        </div>

                        {/* Chapters List */}
                        <div className="divide-y divide-border">
                            {chapters.map((chapter, idx) => {
                                const chapterDoneSteps = chapter.steps.filter((s) => completedStepIds.includes(s.id)).length
                                const chapterComplete = chapterDoneSteps === chapter.steps.length
                                const chapterStarted = chapterDoneSteps > 0

                                return (
                                    <div key={chapter.id} className={cn(
                                        'p-5 flex items-center justify-between gap-4 flex-wrap',
                                        chapterComplete && 'bg-slate-50/60'
                                    )}>
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <div className={cn(
                                                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                                                chapterComplete
                                                    ? 'bg-emerald-100 text-emerald-600'
                                                    : chapterStarted
                                                        ? 'bg-indigo-100 text-indigo-600'
                                                        : 'bg-slate-100 text-slate-400'
                                            )}>
                                                {chapterComplete ? (
                                                    <CheckCircle2 className="w-5 h-5" />
                                                ) : (
                                                    <BookOpen className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs text-slate-400 font-medium">Ch{idx + 1}</span>
                                                    <Badge variant="outline" className={cn('text-xs', config.badge)}>
                                                        {chapter.steps.length} 스텝
                                                    </Badge>
                                                    {chapterComplete && (
                                                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">완료</Badge>
                                                    )}
                                                    {chapterStarted && !chapterComplete && (
                                                        <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">진행중 {chapterDoneSteps}/{chapter.steps.length}</Badge>
                                                    )}
                                                </div>
                                                <h3 className="mt-1 font-semibold text-slate-900">{chapter.title}</h3>
                                                <p className="mt-0.5 text-sm text-slate-500 line-clamp-2">{chapter.description}</p>

                                                {/* Step type pills */}
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {chapter.steps.map((s) => (
                                                        <span
                                                            key={s.id}
                                                            className={cn(
                                                                'px-2 py-0.5 rounded-full text-[11px] font-medium border',
                                                                completedStepIds.includes(s.id)
                                                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                                    : s.type === 'CONCEPT'
                                                                        ? 'bg-sky-50 text-sky-600 border-sky-200'
                                                                        : s.type === 'MCQ'
                                                                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                                            : s.type === 'SHORT_ANSWER'
                                                                                ? 'bg-orange-50 text-orange-700 border-orange-200'
                                                                                : 'bg-violet-50 text-violet-700 border-violet-200'
                                                            )}
                                                        >
                                                            {completedStepIds.includes(s.id) ? '✓ ' : ''}
                                                            {s.type === 'CONCEPT' ? '개념' : s.type === 'MCQ' ? '객관식' : s.type === 'SHORT_ANSWER' ? '단답형' : '코딩'}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            asChild
                                            className={cn('rounded-full px-6 font-semibold shrink-0 text-white', config.buttonClass)}
                                        >
                                            <Link to={`/course/${level.toLowerCase()}/${chapter.steps[0]?.id}`}>
                                                {chapterComplete ? '복습하기' : chapterStarted ? '이어하기' : '시작하기'}
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}
