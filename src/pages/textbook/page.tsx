import { BookOpenText, CheckCircle2, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  SAMPLE_TEXTBOOK_CHAPTERS,
  getRecommendedNextChapterId,
  getTextbookCompletionSummary,
  getTextbookProgress,
} from '@/shared/lib/textbook'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { Surface } from '@/widgets/cards/surface'

export function TextbookPage() {
  const summary = getTextbookCompletionSummary()
  const recommendedId = getRecommendedNextChapterId()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-6">
        <h1 className="text-2xl font-bold text-slate-900">샘플문항 교재 학습</h1>
        <p className="mt-2 text-sm text-slate-600">
          샘플문항을 챕터형 교재로 재구성해 개념 학습, 실습, 체크퀴즈까지 한 번에 진행합니다.
        </p>
        <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">교재 학습 완료율</p>
            <Badge variant="outline">
              {summary.completed}/{summary.total}
            </Badge>
          </div>
          <Progress value={summary.completionRate} className="mt-2 h-2.5" />
          <p className="mt-1 text-xs text-slate-600">완료율 {summary.completionRate}%</p>
          {recommendedId ? (
            <div className="mt-3">
              <Button asChild size="sm" className="rounded-full px-4">
                <Link to={`/textbook/${recommendedId}`}>추천 챕터 바로가기</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <Surface title="교재 챕터 목록">
        <div className="grid gap-3 md:grid-cols-2">
          {SAMPLE_TEXTBOOK_CHAPTERS.map((chapter) => {
            const progress = getTextbookProgress(chapter.id)
            return (
              <article key={chapter.id} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Track {chapter.level}</Badge>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  {chapter.estimatedMinutes}분
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{chapter.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{chapter.objective}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                  <BookOpenText className="h-3.5 w-3.5" />
                  개념 {chapter.concepts.length}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 text-[11px] text-sky-800">
                  실습 {chapter.practice.length}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  퀴즈 {chapter.quiz.length}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] ${
                    progress.completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {progress.completed ? '완료' : '진행중'}
                </span>
              </div>
              <div className="mt-4">
                <Button asChild className="rounded-full px-4">
                  <Link to={`/textbook/${chapter.id}`}>챕터 학습 시작</Link>
                </Button>
              </div>
              </article>
            )
          })}
        </div>
      </Surface>
    </div>
  )
}
