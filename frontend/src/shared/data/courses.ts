export type LessonType = 'concept' | 'practice' | 'quiz' | 'video'

export interface Lesson {
    id: string
    title: string
    type: LessonType
    duration?: string
    completed: boolean
}

export interface Chapter {
    id: string
    title: string
    description: string
    lessons: Lesson[]
}

export interface Course {
    id: string
    title: string
    description: string
    level: 'basic' | 'associate' | 'junior'
    thumbnail?: string
    progress: number
    totalLessons: number
    completedLessons: number
    chapters: Chapter[]
}

export const courses: Course[] = [
    {
        id: 'associate-01',
        title: '데이터 사이언스를 위한 파이썬',
        description: 'Pandas, Matplotlib 등 데이터 분석 핵심 라이브러리를 마스터합니다.',
        level: 'associate',
        progress: 30,
        totalLessons: 14,
        completedLessons: 4,
        chapters: [
            {
                id: 'ch-01',
                title: '01 파이썬 기초 문법',
                description: '파이썬 프로그래밍의 기초를 다룹니다.',
                lessons: [
                    { id: 'l-01', title: '변수와 자료형 이해하기', type: 'concept', duration: '15분', completed: true },
                    { id: 'l-02', title: '[실습] 변수 선언과 타입 변환', type: 'practice', duration: '20분', completed: true },
                    { id: 'l-03', title: '조건문과 반복문', type: 'concept', duration: '20분', completed: true },
                    { id: 'l-04', title: '[실습] 조건문으로 짝수/홀수 판별하기', type: 'practice', duration: '25분', completed: true },
                    { id: 'l-05', title: '함수 정의와 활용', type: 'concept', duration: '15분', completed: false },
                    { id: 'l-06', title: '[실습] 함수로 계산기 만들기', type: 'practice', duration: '30분', completed: false },
                    { id: 'l-07', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
            {
                id: 'ch-02',
                title: '02 데이터 분석의 기초 - Pandas',
                description: 'Pandas 라이브러리를 활용한 데이터 처리를 배웁니다.',
                lessons: [
                    { id: 'l-08', title: 'Pandas 소개와 설치', type: 'concept', duration: '10분', completed: false },
                    { id: 'l-09', title: 'DataFrame 생성과 조작', type: 'concept', duration: '20분', completed: false },
                    { id: 'l-10', title: '[영상] DataFrame 실전 예제', type: 'video', duration: '12분', completed: false },
                    { id: 'l-11', title: '[실습] CSV 파일 불러오기와 탐색', type: 'practice', duration: '25분', completed: false },
                    { id: 'l-12', title: '데이터 필터링과 정렬', type: 'concept', duration: '15분', completed: false },
                    { id: 'l-13', title: '[실습] 데이터 전처리 실습', type: 'practice', duration: '30분', completed: false },
                    { id: 'l-14', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
        ]
    },
    {
        id: 'basic-01',
        title: '인공지능의 이해',
        description: '인공지능의 기본 개념과 다양한 활용 사례를 학습합니다.',
        level: 'basic',
        progress: 0,
        totalLessons: 10,
        completedLessons: 0,
        chapters: [
            {
                id: 'ch-b1-01',
                title: '01 인공지능이란?',
                description: 'AI의 정의와 발전 과정을 알아봅니다.',
                lessons: [
                    { id: 'lb-01', title: '인공지능의 정의', type: 'concept', duration: '15분', completed: false },
                    { id: 'lb-02', title: 'AI의 역사와 발전', type: 'concept', duration: '20분', completed: false },
                    { id: 'lb-03', title: '[영상] AI가 바꾸는 세상', type: 'video', duration: '10분', completed: false },
                    { id: 'lb-04', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
            {
                id: 'ch-b1-02',
                title: '02 머신러닝의 기초',
                description: '머신러닝의 핵심 원리를 학습합니다.',
                lessons: [
                    { id: 'lb-05', title: '지도학습 vs 비지도학습', type: 'concept', duration: '20분', completed: false },
                    { id: 'lb-06', title: '분류와 회귀', type: 'concept', duration: '15분', completed: false },
                    { id: 'lb-07', title: '[실습] 간단한 분류 모델 만들기', type: 'practice', duration: '25분', completed: false },
                    { id: 'lb-08', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
            {
                id: 'ch-b1-03',
                title: '03 데이터 분석 입문',
                description: '코딩 없이 데이터를 분석하는 방법을 배웁니다.',
                lessons: [
                    { id: 'lb-09', title: '데이터 시각화 기초', type: 'concept', duration: '15분', completed: false },
                    { id: 'lb-10', title: '[실습] AutoML로 모델 만들기', type: 'practice', duration: '30분', completed: false },
                ]
            },
        ]
    },
    {
        id: 'basic-02',
        title: 'No-Code 데이터 분석',
        description: '코딩 없이 데이터를 분석하고 시각화하는 방법을 배웁니다.',
        level: 'basic',
        progress: 0,
        totalLessons: 8,
        completedLessons: 0,
        chapters: [
            {
                id: 'ch-b2-01',
                title: '01 No-Code 도구 소개',
                description: 'AutoML과 데이터 시각화 도구를 알아봅니다.',
                lessons: [
                    { id: 'lb2-01', title: 'AutoML이란?', type: 'concept', duration: '10분', completed: false },
                    { id: 'lb2-02', title: '[영상] AutoML 데모', type: 'video', duration: '15분', completed: false },
                    { id: 'lb2-03', title: '[실습] AutoML 체험하기', type: 'practice', duration: '25분', completed: false },
                    { id: 'lb2-04', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
            {
                id: 'ch-b2-02',
                title: '02 데이터 시각화',
                description: '차트와 그래프로 데이터를 표현합니다.',
                lessons: [
                    { id: 'lb2-05', title: '차트 유형과 활용', type: 'concept', duration: '15분', completed: false },
                    { id: 'lb2-06', title: '[실습] 시각화 대시보드 만들기', type: 'practice', duration: '30분', completed: false },
                    { id: 'lb2-07', title: '데이터 스토리텔링', type: 'concept', duration: '15분', completed: false },
                    { id: 'lb2-08', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
        ]
    },
    {
        id: 'associate-02',
        title: '머신러닝 기초',
        description: 'Scikit-learn을 활용한 머신러닝 모델링의 기초를 다집니다.',
        level: 'associate',
        progress: 0,
        totalLessons: 12,
        completedLessons: 0,
        chapters: [
            {
                id: 'ch-a2-01',
                title: '01 Scikit-learn 시작하기',
                description: '사이킷런 라이브러리의 기초를 배웁니다.',
                lessons: [
                    { id: 'la2-01', title: 'Scikit-learn 소개', type: 'concept', duration: '15분', completed: false },
                    { id: 'la2-02', title: '데이터셋 불러오기', type: 'concept', duration: '10분', completed: false },
                    { id: 'la2-03', title: '[실습] Iris 데이터셋 탐색', type: 'practice', duration: '25분', completed: false },
                    { id: 'la2-04', title: '단원 퀴즈', type: 'quiz', duration: '10분', completed: false },
                ]
            },
            {
                id: 'ch-a2-02',
                title: '02 분류 모델',
                description: '다양한 분류 알고리즘을 학습합니다.',
                lessons: [
                    { id: 'la2-05', title: '의사결정 트리', type: 'concept', duration: '20분', completed: false },
                    { id: 'la2-06', title: '[실습] 의사결정 트리 구현', type: 'practice', duration: '30분', completed: false },
                    { id: 'la2-07', title: '랜덤 포레스트', type: 'concept', duration: '20분', completed: false },
                    { id: 'la2-08', title: '[실습] 랜덤 포레스트 실습', type: 'practice', duration: '30분', completed: false },
                ]
            },
            {
                id: 'ch-a2-03',
                title: '03 모델 평가와 개선',
                description: '모델 성능을 평가하고 개선하는 방법을 학습합니다.',
                lessons: [
                    { id: 'la2-09', title: '교차 검증', type: 'concept', duration: '15분', completed: false },
                    { id: 'la2-10', title: '[실습] 교차 검증 실습', type: 'practice', duration: '25분', completed: false },
                    { id: 'la2-11', title: '하이퍼파라미터 튜닝', type: 'concept', duration: '20분', completed: false },
                    { id: 'la2-12', title: '종합 퀴즈', type: 'quiz', duration: '15분', completed: false },
                ]
            },
        ]
    },
    {
        id: 'junior-01',
        title: 'Hello AI',
        description: '초중고 학생들을 위한 쉽고 재미있는 인공지능 입문.',
        level: 'junior',
        progress: 0,
        totalLessons: 8,
        completedLessons: 0,
        chapters: [
            {
                id: 'ch-j-01',
                title: '01 AI와 친구 되기',
                description: '인공지능이 우리 생활에서 어떻게 쓰이는지 알아봅니다.',
                lessons: [
                    { id: 'lj-01', title: 'AI는 어디에 있을까?', type: 'concept', duration: '10분', completed: false },
                    { id: 'lj-02', title: '[영상] AI 로봇 이야기', type: 'video', duration: '8분', completed: false },
                    { id: 'lj-03', title: '단원 퀴즈', type: 'quiz', duration: '5분', completed: false },
                ]
            },
            {
                id: 'ch-j-02',
                title: '02 블록 코딩으로 AI 만들기',
                description: '블록 코딩으로 간단한 AI를 만들어봅니다.',
                lessons: [
                    { id: 'lj-04', title: '블록 코딩 소개', type: 'concept', duration: '10분', completed: false },
                    { id: 'lj-05', title: '[실습] 이미지 분류기 만들기', type: 'practice', duration: '30분', completed: false },
                    { id: 'lj-06', title: '단원 퀴즈', type: 'quiz', duration: '5분', completed: false },
                ]
            },
            {
                id: 'ch-j-03',
                title: '03 나만의 AI 프로젝트',
                description: '배운 것을 활용해 프로젝트를 완성합니다.',
                lessons: [
                    { id: 'lj-07', title: '[실습] 나만의 AI 작품 만들기', type: 'practice', duration: '40분', completed: false },
                    { id: 'lj-08', title: '결과 발표와 공유', type: 'concept', duration: '10분', completed: false },
                ]
            },
        ]
    },
]

export function getCourseById(id: string): Course | undefined {
    return courses.find(c => c.id === id)
}

export function getCoursesByLevel(level: string): Course[] {
    return courses.filter(c => c.level === level)
}

export function getLessonTypeLabel(type: LessonType): string {
    switch (type) {
        case 'concept': return '개념'
        case 'practice': return '실습'
        case 'quiz': return '퀴즈'
        case 'video': return '영상'
    }
}

export function getLessonTypeBadgeClass(type: LessonType): string {
    switch (type) {
        case 'concept': return 'badge-concept'
        case 'practice': return 'badge-practice'
        case 'quiz': return 'badge-quiz'
        case 'video': return 'badge-video'
    }
}
