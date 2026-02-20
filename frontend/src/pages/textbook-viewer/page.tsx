import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from '@/shared/lib/toast'
import {
  getTextbookChapter,
  getTextbookProgress,
  markConceptDone,
  markPracticeDone,
  saveQuizScore,
} from '@/shared/lib/textbook'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Surface } from '@/widgets/cards/surface'

export function TextbookViewerPage() {
  const { chapterId = 'ch1-data-prep' } = useParams()
  const chapter = useMemo(() => getTextbookChapter(chapterId), [chapterId])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [, forceRefresh] = useState(0)
  const progress = chapterId ? getTextbookProgress(chapterId) : null

  if (!chapter) {
    return (
      <Surface title="챕터를 찾을 수 없습니다">
        <Button asChild className="rounded-full px-4">
          <Link to="/textbook">교재 목록으로 이동</Link>
        </Button>
      </Surface>
    )
  }

  const submitQuiz = () => {
    const total = chapter.quiz.length
    const correct = chapter.quiz.reduce((sum, item) => {
      return sum + (answers[item.id] === item.answerIndex ? 1 : 0)
    }, 0)
    const score = Math.round((correct / total) * 100)
    saveQuizScore(chapter.id, score)
    forceRefresh((prev) => prev + 1)

    toast({
      tone: score >= 80 ? 'success' : score >= 50 ? 'info' : 'error',
      title: `${chapter.title} 퀴즈 결과 ${score}점`,
      description: `${correct}/${total} 정답 · 오답 해설을 확인하고 다음 단계로 진행하세요.`,
    })
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-sky-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Sample Textbook</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">{chapter.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{chapter.objective}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">Track {chapter.level}</Badge>
          <Badge variant="secondary">{chapter.estimatedMinutes}분</Badge>
          <Badge variant="outline" className={progress?.completed ? 'bg-emerald-50 text-emerald-700' : ''}>
            {progress?.completed ? '완료' : '진행중'}
          </Badge>
        </div>
      </div>

      <Surface title="교재 학습 뷰어">
        <Tabs defaultValue="concept">
          <TabsList className="h-10 bg-slate-100">
            <TabsTrigger value="concept">개념</TabsTrigger>
            <TabsTrigger value="practice">실습</TabsTrigger>
            <TabsTrigger value="quiz">체크퀴즈</TabsTrigger>
          </TabsList>

          <TabsContent value="concept" className="mt-4 space-y-2">
            {chapter.concepts.map((item) => (
              <article key={item} className="rounded-xl border border-border bg-white p-4 text-sm text-slate-700">
                {item}
              </article>
            ))}
            <Button
              variant="outline"
              className="rounded-full px-4"
              onClick={() => {
                markConceptDone(chapter.id)
                forceRefresh((prev) => prev + 1)
                toast({ tone: 'success', title: '개념 학습 완료 처리', description: `${chapter.title} 개념 학습이 저장되었습니다.` })
              }}
            >
              개념 학습 완료 체크
            </Button>
          </TabsContent>

          <TabsContent value="practice" className="mt-4 space-y-2">
            {chapter.practice.map((item, index) => (
              <article key={item} className="rounded-xl border border-border bg-white p-4">
                <p className="text-xs font-semibold text-slate-500">Practice {index + 1}</p>
                <p className="mt-1 text-sm text-slate-700">{item}</p>
              </article>
            ))}
            <Button
              variant="outline"
              className="rounded-full px-4"
              onClick={() => {
                markPracticeDone(chapter.id)
                forceRefresh((prev) => prev + 1)
                toast({ tone: 'success', title: '실습 완료 처리', description: `${chapter.title} 실습 완료가 저장되었습니다.` })
              }}
            >
              실습 완료 체크
            </Button>
          </TabsContent>

          <TabsContent value="quiz" className="mt-4 space-y-3">
            {chapter.quiz.map((item, index) => (
              <article key={item.id} className="rounded-xl border border-border bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Q{index + 1}. {item.question}
                </p>
                <div className="mt-2 space-y-1.5">
                  {item.options.map((option, optionIndex) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <input
                        type="radio"
                        name={item.id}
                        checked={answers[item.id] === optionIndex}
                        onChange={() => setAnswers((prev) => ({ ...prev, [item.id]: optionIndex }))}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">해설: {item.explanation}</p>
              </article>
            ))}
            <Button onClick={submitQuiz} className="rounded-full px-5">
              퀴즈 채점하기
            </Button>
            <p className="text-xs text-slate-500">
              현재 저장 점수: {progress?.quizScore ?? '-'}점 (80점 이상 + 개념/실습 완료 시 챕터 완료 처리)
            </p>
          </TabsContent>
        </Tabs>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full px-4">
            <Link to="/textbook">교재 목록</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full px-4">
            <Link to="/plan">내 플랜으로 복귀</Link>
          </Button>
        </div>
      </Surface>
    </div>
  )
}
