export type QuestionType = 'single-choice' | 'multiple-choice' | 'short-answer'

export interface Question {
    id: number
    type: QuestionType
    text: string
    passage?: string // Optional context/passage/code block
    choices?: string[] // For choice types
    correctAnswer?: string | number[] // Simple string or array of indices
    score: number
}

export interface ExamSection {
    id: string
    title: string
    questions: Question[]
}

export interface MockExam {
    id: string
    title: string
    durationMinutes: number
    totalScore: number
    passScore: number
    sections: ExamSection[]
}

export const mockExams: MockExam[] = [
    {
        id: 'associate-001',
        title: 'AICE Associate 실전 모의고사 1회',
        durationMinutes: 60,
        totalScore: 100,
        passScore: 60,
        sections: [
            {
                id: 's1',
                title: 'PART 1. AI 이해',
                questions: [
                    {
                        id: 1,
                        type: 'single-choice',
                        text: '다음 중 인공지능(AI), 머신러닝(ML), 딥러닝(DL)의 포함 관계로 올바른 것은?',
                        choices: ['AI > ML > DL', 'DL > ML > AI', 'AI > DL > ML', 'ML > AI > DL'],
                        correctAnswer: [0],
                        score: 5
                    },
                    {
                        id: 2,
                        type: 'single-choice',
                        text: '지도학습(Supervised Learning)에 해당하지 않는 알고리즘은?',
                        choices: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'Decision Tree'],
                        correctAnswer: [2],
                        score: 5
                    }
                ]
            },
            {
                id: 's2',
                title: 'PART 2. 데이터 분석',
                questions: [
                    {
                        id: 3,
                        type: 'single-choice',
                        text: '다음 데이터셋에서 결측치를 처리하는 방법으로 적절하지 않은 것은?',
                        passage: `import pandas as pd
df = pd.read_csv('data.csv')
# 데이터 전처리
...`,
                        choices: ['평균값으로 대체', '중앙값으로 대체', '해당 행 삭제', '모두 0으로 변환 후 학습'],
                        correctAnswer: [3],
                        score: 10
                    }
                ]
            }
        ]
    }
]
