export type TextbookChapter = {
  id: string
  title: string
  level: 'Basic' | 'Associate' | 'Professional'
  objective: string
  estimatedMinutes: number
  concepts: string[]
  practice: string[]
  quiz: Array<{
    id: string
    question: string
    options: string[]
    answerIndex: number
    explanation: string
  }>
}

export type TextbookChapterProgress = {
  chapterId: string
  conceptDone: boolean
  practiceDone: boolean
  quizScore: number | null
  completed: boolean
  completedAt: string | null
  lastStudiedAt: string | null
}

export type PendingTextbookChapter = {
  chapterId: string
  title: string
  estimatedMinutes: number
}

export const SAMPLE_TEXTBOOK_CHAPTERS: TextbookChapter[] = [
  {
    id: 'ch1-data-prep',
    title: 'CH1. 데이터 전처리 기준선',
    level: 'Associate',
    objective: '결측치/이상치/형변환 처리 기준을 확립합니다.',
    estimatedMinutes: 55,
    concepts: [
      '결측치 처리 순서(탐색 -> 전략 선택 -> 검증)',
      '수치형/범주형 전처리 분기',
      'train-test 일관성 보장 규칙',
    ],
    practice: [
      '결측 비율 20% 이상 컬럼 처리 정책 수립',
      '표준화/인코딩 파이프라인 템플릿 작성',
      '전처리 전후 shape/type 검증 코드 작성',
    ],
    quiz: [
      {
        id: 'q1',
        question: '범주형 결측치 처리에서 가장 우선해야 하는 것은?',
        options: ['무조건 행 삭제', '도메인 기준 대체 + 근거 기록', '무조건 평균값 대체', '무시'],
        answerIndex: 1,
        explanation: '도메인 기반 대체와 재현 가능한 근거 기록이 시험 채점 관점에서 중요합니다.',
      },
      {
        id: 'q2',
        question: '전처리 후 반드시 확인해야 할 항목으로 가장 적절한 것은?',
        options: ['폰트 크기', 'shape/type/누락 변수', 'CPU 온도', '랜덤 시드 삭제'],
        answerIndex: 1,
        explanation: '정답 변수 누락 방지를 위해 shape/type/필수 변수 검증이 필요합니다.',
      },
    ],
  },
  {
    id: 'ch2-answer-vars',
    title: 'CH2. 답안 변수/제출 포맷 규칙',
    level: 'Associate',
    objective: 'ANSWER_VAR_* 계열 오류를 근본적으로 줄입니다.',
    estimatedMinutes: 45,
    concepts: [
      '답안 변수 네이밍 컨벤션',
      '타입 정합성(Series/DataFrame/scalar)',
      '제출 직전 자동 검증 루틴',
    ],
    practice: [
      'answer01~answer05 변수 선언 템플릿 구성',
      '타입 검증 assert 블록 작성',
      '제출 직전 checklist 함수 작성',
    ],
    quiz: [
      {
        id: 'q1',
        question: 'ANSWER_VAR_MISSING 방지에 가장 효과적인 습관은?',
        options: ['실행 없이 제출', '변수 선언 템플릿 고정', '변수명을 매번 다르게', '주석 삭제'],
        answerIndex: 1,
        explanation: '고정 템플릿 + 제출 전 검증으로 누락 오류를 크게 줄일 수 있습니다.',
      },
      {
        id: 'q2',
        question: '정답 타입 불일치 방지를 위해 필요한 것은?',
        options: ['print만 사용', 'assert/type 체크', '랜덤값 반환', 'try/except로 무시'],
        answerIndex: 1,
        explanation: 'assert/type 체크 루틴이 타입 오류를 사전에 차단합니다.',
      },
    ],
  },
  {
    id: 'ch3-model-pipeline',
    title: 'CH3. 모델링 파이프라인과 평가',
    level: 'Professional',
    objective: '학습-평가-해석 흐름을 한 번에 완성합니다.',
    estimatedMinutes: 65,
    concepts: [
      'train/valid split 기준',
      '평가지표 선택(RMSE, F1 등)',
      '오버피팅 감지와 개선',
    ],
    practice: [
      '베이스라인 모델과 개선 모델 비교',
      '평가지표 계산 및 해석 문장 작성',
      '실행시간 최적화(벡터화/캐시) 적용',
    ],
    quiz: [
      {
        id: 'q1',
        question: '모델 개선 판단의 기준으로 가장 적절한 것은?',
        options: ['학습시간만 최소', '검증 지표 개선 + 재현성', '코드 줄 수', '랜덤 시드 변경'],
        answerIndex: 1,
        explanation: '검증 지표 개선과 재현성 확보가 핵심입니다.',
      },
      {
        id: 'q2',
        question: '오버피팅 가능성을 보여주는 신호는?',
        options: ['train 점수 상승, valid 정체/하락', '둘 다 상승', '둘 다 동일', '랜덤값'],
        answerIndex: 0,
        explanation: 'train/valid 격차 확대는 오버피팅 신호입니다.',
      },
    ],
  },
  {
    id: 'ch4-mock-strategy',
    title: 'CH4. 모의고사 운영 전략',
    level: 'Associate',
    objective: '실전 시간 관리와 회고 루틴을 확립합니다.',
    estimatedMinutes: 50,
    concepts: [
      '90분 타임박스 배분',
      '정책 준수와 리스크 회피',
      '모의 후 오답 분류 체계',
    ],
    practice: [
      '실전 타이머 기반 1회 모의',
      '오답 코드별 재학습 큐 생성',
      '다음 시험 전날 체크리스트 작성',
    ],
    quiz: [
      {
        id: 'q1',
        question: '모의고사 직후 가장 먼저 해야 할 일은?',
        options: ['바로 다음 모의 시작', '오답코드 기준 회고 정리', '환경설정 변경', '문제 삭제'],
        answerIndex: 1,
        explanation: '오답코드 중심 회고가 점수 개선 속도를 높입니다.',
      },
      {
        id: 'q2',
        question: '정책 위반 리스크를 줄이는 방법은?',
        options: ['외부 링크 탐색', '허용 문서만 참조', '임의 import', '네트워크 호출'],
        answerIndex: 1,
        explanation: '시험 정책 허용 범위 내 자료만 사용해야 합니다.',
      },
    ],
  },
]

export function getTextbookChapter(chapterId: string) {
  return SAMPLE_TEXTBOOK_CHAPTERS.find((item) => item.id === chapterId) ?? null
}

const PROGRESS_KEY = 'aice_textbook_progress'

function nowIso() {
  return new Date().toISOString()
}

function defaultProgress(chapterId: string): TextbookChapterProgress {
  return {
    chapterId,
    conceptDone: false,
    practiceDone: false,
    quizScore: null,
    completed: false,
    completedAt: null,
    lastStudiedAt: null,
  }
}

export function loadTextbookProgressMap(): Record<string, TextbookChapterProgress> {
  const raw = localStorage.getItem(PROGRESS_KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as Record<string, TextbookChapterProgress>
    return parsed ?? {}
  } catch {
    return {}
  }
}

function saveTextbookProgressMap(next: Record<string, TextbookChapterProgress>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
}

export function getTextbookProgress(chapterId: string): TextbookChapterProgress {
  const map = loadTextbookProgressMap()
  return map[chapterId] ?? defaultProgress(chapterId)
}

export function markConceptDone(chapterId: string) {
  const map = loadTextbookProgressMap()
  const prev = map[chapterId] ?? defaultProgress(chapterId)
  map[chapterId] = {
    ...prev,
    conceptDone: true,
    lastStudiedAt: nowIso(),
    completed: prev.practiceDone && (prev.quizScore ?? 0) >= 80,
    completedAt:
      prev.practiceDone && (prev.quizScore ?? 0) >= 80 ? prev.completedAt ?? nowIso() : null,
  }
  saveTextbookProgressMap(map)
}

export function markPracticeDone(chapterId: string) {
  const map = loadTextbookProgressMap()
  const prev = map[chapterId] ?? defaultProgress(chapterId)
  map[chapterId] = {
    ...prev,
    practiceDone: true,
    lastStudiedAt: nowIso(),
    completed: prev.conceptDone && (prev.quizScore ?? 0) >= 80,
    completedAt:
      prev.conceptDone && (prev.quizScore ?? 0) >= 80 ? prev.completedAt ?? nowIso() : null,
  }
  saveTextbookProgressMap(map)
}

export function saveQuizScore(chapterId: string, score: number) {
  const map = loadTextbookProgressMap()
  const prev = map[chapterId] ?? defaultProgress(chapterId)
  const passed = score >= 80
  map[chapterId] = {
    ...prev,
    quizScore: score,
    lastStudiedAt: nowIso(),
    completed: prev.conceptDone && prev.practiceDone && passed,
    completedAt: prev.conceptDone && prev.practiceDone && passed ? prev.completedAt ?? nowIso() : null,
  }
  saveTextbookProgressMap(map)
}

export function getTextbookCompletionSummary() {
  const map = loadTextbookProgressMap()
  const total = SAMPLE_TEXTBOOK_CHAPTERS.length
  const completed = SAMPLE_TEXTBOOK_CHAPTERS.filter((chapter) => map[chapter.id]?.completed).length
  const completionRate = total ? Math.round((completed / total) * 100) : 0
  return { total, completed, completionRate }
}

export function getRecommendedNextChapterId() {
  const map = loadTextbookProgressMap()
  const firstIncomplete = SAMPLE_TEXTBOOK_CHAPTERS.find((chapter) => !map[chapter.id]?.completed)
  if (firstIncomplete) return firstIncomplete.id
  return SAMPLE_TEXTBOOK_CHAPTERS[0]?.id ?? null
}

export function getPendingTextbookChapters(limit = 3): PendingTextbookChapter[] {
  const map = loadTextbookProgressMap()
  return SAMPLE_TEXTBOOK_CHAPTERS.filter((chapter) => !map[chapter.id]?.completed)
    .slice(0, Math.max(1, limit))
    .map((chapter) => ({
      chapterId: chapter.id,
      title: chapter.title,
      estimatedMinutes: chapter.estimatedMinutes,
    }))
}
