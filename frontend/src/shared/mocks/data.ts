import type { Lab, PlanTask, SessionStep } from '@/shared/types/domain'

export const labs: Lab[] = [
  {
    id: 'lab-pipeline-01',
    title: 'Full Pipeline: 회귀 기본 세트',
    goal: 'EDA부터 평가까지 전체 흐름 완주',
    steps: 5,
    time: 70,
    examMode: true,
  },
  {
    id: 'lab-prep-02',
    title: '전처리 집중: 결측치/인코딩',
    goal: '빈출 전처리 실수 감소',
    steps: 4,
    time: 50,
    examMode: true,
  },
]

export const planTasks: PlanTask[] = [
  { id: 't1', date: '2026-02-19', type: 'Lab', title: '결측치 + 인코딩 실습', estMinutes: 45, status: 'TODO' },
  { id: 't2', date: '2026-02-19', type: 'Review', title: '평가 지표 복습', estMinutes: 20, status: 'DONE' },
  { id: 't3', date: '2026-02-20', type: 'Mock', title: '시험지 모드 미니 모의', estMinutes: 60, status: 'TODO' },
]

export const sessionStepsSeed: SessionStep[] = [
  { no: 1, title: '데이터 로딩/기초 점검', state: 'PASS', requiredVars: ['answer01'] },
  { no: 2, title: '결측치 처리', state: 'OPEN', requiredVars: ['answer02'] },
  { no: 3, title: '인코딩/스케일링', state: 'LOCKED', requiredVars: ['answer03'] },
  { no: 4, title: '모델 학습', state: 'LOCKED', requiredVars: ['answer04_1'] },
]
