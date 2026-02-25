import type { AdminLabSummary, HistoryEntry, Lab, MistakeItem, PlanTask, PolicyRule, ReferenceDoc, SessionStep } from '@/shared/types/domain'

export const labs: Lab[] = [
  {
    id: 'lab-pipeline-01',
    title: 'Full Pipeline: 회귀 기본 세트',
    goal: 'EDA부터 평가까지 전체 흐름 완주',
    steps: 5,
    time: 70,
    examMode: true,
    difficulty: 'MID',
    tags: ['회귀', '전처리', '평가'],
  },
  {
    id: 'lab-prep-02',
    title: '전처리 집중: 결측치/인코딩',
    goal: '빈출 전처리 실수 감소',
    steps: 4,
    time: 50,
    examMode: true,
    difficulty: 'MID',
    tags: ['전처리', '인코딩'],
  },
  {
    id: 'lab-viz-03',
    title: '시각화 제출 훈련',
    goal: '그래프 해석과 결과 제출 정확도 강화',
    steps: 3,
    time: 35,
    examMode: false,
    difficulty: 'EASY',
    tags: ['시각화'],
  },
]

export const planTasks: PlanTask[] = [
  { id: 't1', date: '2026-02-19', type: 'Lab', title: '결측치 + 인코딩 실습', estMinutes: 45, status: 'TODO' },
  { id: 't2', date: '2026-02-19', type: 'Review', title: '평가 지표 복습', estMinutes: 20, status: 'DONE' },
  { id: 't3', date: '2026-02-20', type: 'Mock', title: '시험지 모드 미니 모의', estMinutes: 60, status: 'TODO' },
  { id: 't4', date: '2026-02-20', type: 'Drill', title: '변수명 체크 드릴', estMinutes: 25, status: 'TODO' },
]

export const sessionStepsSeed: SessionStep[] = [
  { no: 1, title: '데이터 로딩/기초 점검', state: 'PASS', requiredVars: ['answer01'] },
  { no: 2, title: '결측치 처리', state: 'OPEN', requiredVars: ['answer02'] },
  { no: 3, title: '인코딩/스케일링', state: 'LOCKED', requiredVars: ['answer03'] },
  { no: 4, title: '모델 학습', state: 'LOCKED', requiredVars: ['answer04_1'] },
  { no: 5, title: '평가/결과 제출', state: 'LOCKED', requiredVars: ['answer05'] },
]

export const mistakes: MistakeItem[] = [
  { code: 'ANSWER_VAR_MISSING', severity: 'HIGH', count14d: 8, description: '답안 변수 누락 또는 오타' },
  { code: 'ANSWER_VAR_TYPE_MISMATCH', severity: 'MEDIUM', count14d: 5, description: '요구 타입과 제출 타입 불일치' },
  { code: 'EXEC_TIMEOUT', severity: 'MEDIUM', count14d: 4, description: '셀 실행 시간 초과' },
  { code: 'POLICY_BLOCKED', severity: 'HIGH', count14d: 3, description: '정책 위반으로 제출 차단' },
]

export const referenceDocs: ReferenceDoc[] = [
  { id: 'pd-merge', title: 'Pandas merge/join', category: 'Pandas', allowed: true },
  { id: 'pd-groupby', title: 'Pandas groupby', category: 'Pandas', allowed: true },
  { id: 'skl-split', title: 'sklearn train_test_split', category: 'Sklearn', allowed: true },
  { id: 'ext-blog', title: 'External random blog', category: 'External', allowed: false },
]

export const historyEntries: HistoryEntry[] = [
  { id: 'h1', date: '2026-02-18', mode: 'Mock', result: 'PARTIAL', errorCode: 'EXEC_TIMEOUT' },
  { id: 'h2', date: '2026-02-17', mode: 'Practice+', result: 'PASS' },
  { id: 'h3', date: '2026-02-16', mode: 'Practice', result: 'FAIL', errorCode: 'ANSWER_VAR_MISSING' },
]

export const adminLabs: AdminLabSummary[] = [
  { id: 'lab-pipeline-01', title: 'Full Pipeline: 회귀 기본 세트', status: 'PUBLISHED', version: '1.3.0', updatedAt: '2026-02-18' },
  { id: 'lab-prep-02', title: '전처리 집중: 결측치/인코딩', status: 'DRAFT', version: '0.9.1', updatedAt: '2026-02-19' },
]

export const policyRules: PolicyRule[] = [
  { id: 'plc-practice', mode: 'Practice', allowReference: 'OPEN', hintLevel: 'FULL', retryLimit: 99, timeLimitMin: 0 },
  { id: 'plc-practice-plus', mode: 'Practice+', allowReference: 'ALLOWLIST_ONLY', hintLevel: 'LIMITED', retryLimit: 3, timeLimitMin: 0 },
  { id: 'plc-mock', mode: 'Mock', allowReference: 'ALLOWLIST_ONLY', hintLevel: 'NONE', retryLimit: 1, timeLimitMin: 60 },
]
