import { type Course, courses } from './courses'

export interface Lesson {
    id: string
    title: string
    duration: string
    type: 'video' | 'quiz' | 'reading'
    isCompleted: boolean
}

export interface CurriculumItem {
    stage: number
    title: string
    description: string
    type: 'concept' | 'practice' | 'mock-exam'
    duration: string
    isLocked: boolean
    examId?: string
    lessons?: Lesson[] // Added detailed lessons
}

export interface Track {
    id: 'associate' | 'basic' | 'junior'
    title: string
    description: string
    target: string
    price: number
    duration: string
    tags: string[]
    courses: Course[]
    features: string[]
    curriculum: CurriculumItem[]
}

export const tracks: Track[] = [
    {
        id: 'associate',
        title: 'AICE Associate',
        description: '코딩 없이 배우는 AI 첫걸음',
        target: '비전공자 / 입문자',
        price: 0,
        duration: '2주 완성',
        tags: ['입문', 'No-Code', '기초이론'],
        features: ['AI 기본 개념', 'No-Code 실습', '기출문제 3회분'],
        courses: courses.filter(c => c.level === 'associate'),
        curriculum: [
            {
                stage: 1,
                title: 'AI 기초 이론',
                description: '인공지능의 핵심 개념과 용어를 학습합니다.',
                type: 'concept',
                duration: '3일',
                isLocked: false,
                lessons: [
                    { id: 'l1-1', title: '인공지능의 이해', duration: '15:00', type: 'video', isCompleted: true },
                    { id: 'l1-2', title: '머신러닝 vs 딥러닝', duration: '12:30', type: 'video', isCompleted: true },
                    { id: 'l1-3', title: 'AI 기초 퀴즈', duration: '10분', type: 'quiz', isCompleted: false },
                    { id: 'l1-4', title: '데이터의 중요성', duration: '08:45', type: 'video', isCompleted: false },
                ]
            },
            {
                stage: 2,
                title: 'AIDU-ez 실습 1',
                description: '코딩 없이 클릭만으로 데이터를 분석해봅니다.',
                type: 'practice',
                duration: '4일',
                isLocked: false,
                lessons: [
                    { id: 'l2-1', title: 'AIDU-ez 환경설정', duration: '05:00', type: 'reading', isCompleted: false },
                    { id: 'l2-2', title: '데이터 불러오기 실습', duration: '15:00', type: 'video', isCompleted: false },
                    { id: 'l2-3', title: '데이터 시각화 기초', duration: '20:00', type: 'video', isCompleted: false },
                ]
            },
            {
                stage: 3,
                title: 'AIDU-ez 실습 2',
                description: '실전 예제를 통해 모델링 과정을 익힙니다.',
                type: 'practice',
                duration: '4일',
                isLocked: true
            },
            {
                stage: 4,
                title: '실전 모의고사',
                description: '실제 시험과 동일한 환경에서 테스트합니다.',
                type: 'mock-exam',
                duration: '3일',
                isLocked: false,
                examId: 'associate-001'
            }
        ]
    },
    {
        id: 'basic',
        title: 'AICE Basic',
        description: '파이썬으로 시작하는 실무 데이터 분석',
        target: '전공자 / 실무 입문',
        price: 50000,
        duration: '4주 완성',
        tags: ['실무입문', 'Python', '데이터분석'],
        features: ['Python 기초', '정형 데이터 분석', '분류/회귀 모델링', '실전 모의고사'],
        courses: courses.filter(c => c.level === 'basic'),
        curriculum: [
            { stage: 1, title: 'Python 언어 기초', description: '데이터 분석을 위한 파이썬 필수 문법을 다잡습니다.', type: 'concept', duration: '1주', isLocked: false },
            { stage: 2, title: '데이터 전처리 & 시각화', description: 'Pandas와 Matplotlib을 활용한 데이터 가공 실습.', type: 'practice', duration: '1주', isLocked: true },
            { stage: 3, title: '머신러닝 모델링', description: 'Scikit-learn을 활용한 분류/회귀 모델 구현.', type: 'practice', duration: '1주', isLocked: true },
            { stage: 4, title: 'Final 모의고사', description: '합격을 위한 최종 점검.', type: 'mock-exam', duration: '3일', isLocked: true }
        ]
    },
    {
        id: 'junior',
        title: 'AICE Junior',
        description: '데이터 전문가를 위한 딥러닝 마스터',
        target: '데이터 분석가 / 개발자',
        price: 150000,
        duration: '8주 완성',
        tags: ['전문가', '딥러닝', '프로젝트'],
        features: ['고급 시각화', '딥러닝 모델링', '텍스트 마이닝', '최신 기출 분석'],
        courses: courses.filter(c => c.level === 'junior'),
        curriculum: [
            { stage: 1, title: '딥러닝 이론', description: '신경망, CNN, RNN 등 딥러닝 핵심 알고리즘 이해.', type: 'concept', duration: '2주', isLocked: false },
            { stage: 2, title: 'TensorFlow 심화', description: '텐서플로우를 활용한 고급 모델링 기법 실습.', type: 'practice', duration: '3주', isLocked: true },
            { stage: 3, title: '비정형 데이터 분석', description: '이미지, 텍스트 데이터 처리 및 분석 실습.', type: 'practice', duration: '2주', isLocked: true },
            { stage: 4, title: '실전 프로젝트', description: 'End-to-End AI 프로젝트 수행 및 모의고사.', type: 'mock-exam', duration: '1주', isLocked: true }
        ]
    }
]

// Mock User State for Onboarding
export interface UserState {
    hasOnboarded: boolean
    selectedTrack: string | null
    examDate: string | null
}
