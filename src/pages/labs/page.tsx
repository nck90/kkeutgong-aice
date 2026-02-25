import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Clock3, Filter, Layers3, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'

const difficultyFilter = ['ALL', 'EASY', 'MID', 'HARD'] as const

export function LabsPage() {
  const { data: labs = [], isLoading } = useQuery({
    queryKey: ['labs'],
    queryFn: apiClient.getLabs,
  })
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState<(typeof difficultyFilter)[number]>('ALL')

  const filteredLabs = useMemo(() => {
    return labs.filter((lab) => {
      const matchesDifficulty = difficulty === 'ALL' ? true : lab.difficulty === difficulty
      const matchesQuery =
        query.length === 0 ||
        lab.title.toLowerCase().includes(query.toLowerCase()) ||
        lab.goal.toLowerCase().includes(query.toLowerCase())
      return matchesDifficulty && matchesQuery
    })
  }, [labs, query, difficulty])

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">실습 코스를 불러오는 중입니다...</div>
  }

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-3xl p-7 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Labs Catalog</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">AICE 실습 코스 탐색</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
          난이도, 시험모드, 목표 역량을 기준으로 코스를 탐색하고 바로 학습 세션을 시작할 수 있습니다.
        </p>
      </section>

      <section className="rounded-2xl border border-border/80 bg-white/90 p-4 md:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="코스명, 학습목표로 검색"
              className="h-11 rounded-xl border-border bg-white pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {difficultyFilter.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDifficulty(item)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                  difficulty === item
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredLabs.map((lab) => (
          <Link key={lab.id} to={`/aice/labs/${lab.id}`} className="group">
            <Card className="h-full rounded-2xl border-border/80 bg-white/90 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <Badge variant={lab.difficulty === 'HARD' ? 'destructive' : 'secondary'}>
                    {lab.difficulty}
                  </Badge>
                  <Badge variant={lab.examMode ? 'default' : 'outline'}>
                    {lab.examMode ? 'Exam Mode' : 'Practice'}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-slate-900 group-hover:text-sky-800">
                  {lab.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-slate-600">{lab.goal}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Layers3 className="h-3.5 w-3.5" />
                    {lab.steps} 단계
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {lab.time}분
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                    <Filter className="h-3.5 w-3.5" />
                    상세
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}
