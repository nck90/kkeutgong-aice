import { Calendar, Sparkles, BarChart3, Bell, Code, BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react'

// ==========================================
// 📸 Real Shot UI Mockup Component (from existing proposal)
// ==========================================
export function ImageMockup({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
    return (
        <div className={`flex flex-col rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-[#E5E5E5] p-2 ring-1 ring-black/5 ${className}`}>
            <div className="flex-1 overflow-hidden relative rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] bg-[#191F28]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover object-left-top"
                    loading="lazy"
                />
            </div>
        </div>
    )
}

// Part 2: User Research, Solution 개요, 4 Services + AICE 플랫폼 실제 기능 — 슬라이드 6~16

const slidesGeneralPart2 = [
    // 6. User Research
    {
        id: 'g-user-research',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    User Research
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center leading-tight">
                    개발, 기획, 창업자 커뮤니티에서<br />
                    <span className="text-primary">서비스 수요조사</span>를 진행했습니다.
                </h2>
                <div className="max-w-5xl w-full bg-white p-10 rounded-3xl border border-border shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-2xl bg-[#FAFAFA]">
                            <div className="text-4xl font-black text-primary mb-2">89%</div>
                            <p className="text-sm text-muted-foreground font-medium">
                                "자격증 공부 시작이<br />어렵다"고 응답
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-[#FAFAFA]">
                            <div className="text-4xl font-black text-primary mb-2">76%</div>
                            <p className="text-sm text-muted-foreground font-medium">
                                "체계적인 커리큘럼이<br />필요하다"고 응답
                            </p>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-[#FAFAFA]">
                            <div className="text-4xl font-black text-primary mb-2">92%</div>
                            <p className="text-sm text-muted-foreground font-medium">
                                "AI가 문제를 만들어주면<br />사용하겠다"고 응답
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-8 text-center">
                        * 개발, 기획, 창업자 커뮤니티 대상 수요조사 결과
                    </p>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 7. Solution — 핵심 컨셉
    {
        id: 'g-solution-concept',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 bg-[#191F28] text-white">
                <h3 className="text-primary font-bold text-xl mb-6 tracking-widest uppercase text-center">
                    Solution
                </h3>
                <h2 className="text-4xl md:text-6xl font-black mb-10 text-center leading-tight max-w-5xl">
                    기출문제 PDF만 업로드하면<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        학습이 자동으로 설계됩니다.
                    </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
                    {[
                        { icon: <Calendar className="w-8 h-8" />, num: '01', title: '시험일 맞춤\n커리큘럼', color: 'from-violet-500 to-purple-600' },
                        { icon: <Sparkles className="w-8 h-8" />, num: '02', title: '핵심 개념\n자동 생성', color: 'from-blue-500 to-cyan-500' },
                        { icon: <BarChart3 className="w-8 h-8" />, num: '03', title: '학습 데이터\n시각화', color: 'from-emerald-500 to-green-500' },
                        { icon: <Bell className="w-8 h-8" />, num: '04', title: 'Bandit 알고리즘\n알림', color: 'from-amber-500 to-orange-500' },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl text-center hover:bg-white/10 transition-all hover:-translate-y-2 cursor-default"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mx-auto mb-4`}>
                                {s.icon}
                            </div>
                            <div className="text-white/40 text-sm font-bold mb-2">Service {s.num}</div>
                            <h4 className="text-lg font-bold text-white whitespace-pre-line text-center">{s.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        ),
        background: 'bg-[#191F28]',
    },

    // 8. 플랫폼 소개 인트로
    {
        id: 'g-platform-intro',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    AICE Platform — Real Features
                </h3>
                <h2 className="text-4xl md:text-6xl font-black mb-16 text-foreground text-center leading-tight">
                    현재 AICE 자격증을 타깃으로<br />
                    <span className="text-primary">실제 구현된</span> 플랫폼 기능
                </h2>
                <div className="flex gap-4 max-w-7xl">
                    {['01. 14일 커스텀 플랜', '02. AICE 맞춤 개념장', '03. 인터랙티브 코딩 실습', '04. 메타인지 진단 대시보드'].map(
                        (t, i) => (
                            <div
                                key={i}
                                className="bg-white px-6 py-5 rounded-2xl border border-border font-bold text-center flex-1 shadow-md text-foreground flex flex-col justify-between h-32"
                            >
                                <span className="text-primary/40 text-2xl font-black">{t.split('.')[0]}</span>
                                <span className="text-lg">{t.split('.')[1]}</span>
                            </div>
                        ),
                    )}
                </div>
                <p className="mt-12 text-muted-foreground font-bold bg-primary/10 px-6 py-2 rounded-full inline-block text-center">
                    * 이어지는 화면들은 프론트엔드에 100% 실기동 중인 실제 UI 캡처본입니다.
                </p>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 9. Feature 1 — 14일 맞춤 커리큘럼 (설명)
    {
        id: 'g-feat-plan-intro',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-sm px-4 py-2 rounded-full mb-6">
                    <Calendar className="w-4 h-4" />
                    Feature 01. 맞춤형 커리큘럼
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight text-center">
                    "시험이 코앞인데, 무엇부터 해야 하죠?"
                </h2>
                <p className="text-2xl text-muted-foreground max-w-5xl leading-relaxed mb-8 text-center">
                    더 이상 계획을 짜느라 시간을 낭비하지 마세요.
                    사용자의 목표 트랙과 시험일(D-Day)을 설정하면, 시스템이 알아서
                    <span className="font-bold text-foreground"> 주간(Weekly) 일정과 일일 개념/실습 미션을 자동 분배</span>합니다.
                </p>
                <div className="bg-white p-6 rounded-2xl border border-border shadow-md max-w-4xl w-full">
                    <div className="flex items-center gap-6">
                        {[
                            { day: 'Day 1~3', topic: '기본 개념 정리', pct: 15, color: '#7353EA' },
                            { day: 'Day 4~7', topic: '핵심 이론 학습', pct: 40, color: '#AB9DFE' },
                            { day: 'Day 8~11', topic: '문제 풀이 집중', pct: 75, color: '#00C471' },
                            { day: 'Day 12~14', topic: '모의고사 점검', pct: 100, color: '#FFAB00' },
                        ].map((item, i) => (
                            <div key={i} className="flex-1 text-center">
                                <div className="text-xs font-bold text-primary mb-1">{item.day}</div>
                                <div className="text-sm font-medium text-foreground mb-2">{item.topic}</div>
                                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 10. Feature 1 — 실제 UI (Plan Calendar 스크린샷)
    {
        id: 'g-feat-plan-view',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto">
                <ImageMockup src="/pitch-assets/plan.png" alt="Plan Weekly Calendar — 실제 구현 화면" className="w-full h-[650px]" />
            </div>
        ),
        background: 'bg-[#F3F4F6]',
    },

    // 11. Feature 2 — AICE 맞춤 개념장 (설명)
    {
        id: 'g-feat-textbook-intro',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-bold text-sm px-4 py-2 rounded-full mb-6">
                    <BookOpen className="w-4 h-4" />
                    Feature 02. AICE 맞춤 개념장
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight text-center">
                    두꺼운 수험서 1회독?<br />시험에 나오는 요약 노트를 봅니다.
                </h2>
                <p className="text-2xl text-muted-foreground max-w-5xl leading-relaxed text-center">
                    수백 페이지의 파이썬 문법책을 다 볼 필요가 없습니다.
                    마치 강사가 옆에서 쪽집게 과외를 해주듯, <b>AICE 시험에 100% 출제되는
                        DataFrame, sklearn 핵심 개념</b>들만 모바일/PC 텍스트북 뷰어로 제공합니다.
                </p>
            </div>
        ),
        background: 'bg-white',
    },

    // 12. Feature 2 — 실제 UI (Textbook 스크린샷)
    {
        id: 'g-feat-textbook-view',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto">
                <ImageMockup src="/pitch-assets/textbook.png" alt="AICE 핵심 개념장 — 실제 구현 화면" className="w-full h-[650px]" />
            </div>
        ),
        background: 'bg-[#F3F4F6]',
    },

    // 13. Feature 3 — 인터랙티브 코딩 실습 (설명)
    {
        id: 'g-feat-labs-intro',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 font-bold text-sm px-4 py-2 rounded-full mb-6">
                    <Code className="w-4 h-4" />
                    Feature 03. 인터랙티브 Live 코딩 실습
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight text-center">
                    눈으로 읽은 코드,<br />
                    그 자리에서 바로 손으로 쳐보세요.
                </h2>
                <p className="text-2xl text-muted-foreground max-w-5xl leading-relaxed mb-8 text-center">
                    개념을 암기했다면, AICE 실전 CBT 환경과 <b>동일한 Jupyter 커널</b>이 브라우저에서 열립니다.
                    학습(Textbook) → 실습(Labs) → 테스트(Session)로 끊김없이 이어지는 완전한 러닝 파이프라인.
                </p>
                <div className="bg-[#191F28] p-6 rounded-2xl border border-[#333] shadow-2xl max-w-4xl w-full text-white font-mono text-sm flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-4 border-b border-[#333] pb-3">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-xs text-gray-400 ml-2 font-sans">끝공 Jupyter Sandbox</span>
                    </div>
                    <div className="space-y-1 mb-4">
                        <div><span className="text-green-400">In [1]:</span> <span className="text-white">import pandas as pd</span></div>
                        <div><span className="text-green-400">In [2]:</span> <span className="text-white">df = pd.read_csv('aice_data.csv')</span></div>
                        <div><span className="text-green-400">In [3]:</span> <span className="text-white">df.describe()</span></div>
                        <div className="text-gray-400">       count   mean    std     min     max</div>
                        <div className="text-gray-400">score  250.0   72.4    12.3    45.0    98.0</div>
                    </div>
                    <div className="bg-primary/20 text-primary-foreground p-3 rounded-lg border border-primary/30 flex items-center gap-2 font-sans text-sm font-bold shadow-[0_0_15px_rgba(115,83,234,0.3)]">
                        <CheckCircle2 className="w-4 h-4" /> 별도 환경 구축 없이, 브라우저에서 즉시 파이썬 코드 실행
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FDFDFD]',
    },

    // 14. Feature 3 — 실제 UI (Labs + Session 스크린샷)
    {
        id: 'g-feat-labs-view',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto">
                <ImageMockup src="/pitch-assets/labs.png" alt="실습 Lab 목록 — 실제 구현 화면" className="w-full h-[650px]" />
            </div>
        ),
        background: 'bg-[#191F28]',
    },

    // 15. Feature 3 — 실제 코딩 세션 UI
    {
        id: 'g-feat-session-view',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1500px] mx-auto">
                <ImageMockup src="/pitch-assets/session.png" alt="Live IDE 코딩 세션 — 실제 구현 화면" className="w-full h-[650px]" />
            </div>
        ),
        background: 'bg-[#191F28]',
    },

    // 16. Feature 4 — 메타인지 대시보드 (설명)
    {
        id: 'g-feat-dashboard-intro',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 font-bold text-sm px-4 py-2 rounded-full mb-6">
                    <BrainCircuit className="w-4 h-4" />
                    Feature 04. 메타인지 대시보드 & 약점 진단
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight text-center">
                    "내 실력이 어느 정도인지<br />데이터로 객관화합니다"
                </h2>
                <div className="bg-white p-8 rounded-3xl border border-border shadow-xl max-w-5xl w-full">
                    <h4 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                        <BarChart3 className="w-8 h-8 text-amber-500" /> 감으로 하는 공부는 필패합니다.
                    </h4>
                    <p className="text-xl text-muted-foreground leading-relaxed text-center">
                        학습 시작 전 <b>사전 진단고사(Diagnostic)</b>를 통해 정확한 내 위치를 파악하고,
                        매일 로그인하는 <b>대시보드(Dashboard)</b>에서 진도율과 나의 취약 파트(Scikit-Learn 등)를 수치화된 그래프로 관리받습니다.
                    </p>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 17. Feature 4 — 진단고사 실제 UI
    {
        id: 'g-feat-diagnostic-view',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto bg-[#FAFAFA]">
                <ImageMockup src="/pitch-assets/diagnostic.png" alt="진단고사 — 실제 구현 화면" className="w-full h-[650px] border-[#333]" />
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 18. Feature 4 — 대시보드 실제 UI
    {
        id: 'g-feat-dashboard-view',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-8 max-w-[1400px] mx-auto bg-[#F3F4F6]">
                <ImageMockup src="/pitch-assets/dashboard-auth.png" alt="학습 대시보드 — 실제 구현 화면" className="w-full h-[650px]" />
            </div>
        ),
        background: 'bg-[#F3F4F6]',
    },

    // 19. Zero Configuration — 끝공의 핵심 기술 우위
    {
        id: 'g-zero-config',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <h3 className="text-green-500 font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Zero Configuration
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight text-center">
                    복잡한 파이썬 세팅?<br />그냥 접속하세요.
                </h2>
                <p className="text-2xl text-muted-foreground mb-12 max-w-5xl text-center text-center">
                    공부 시작하기도 전에 '라이브러리 패키지 꼬임'이나 'CUDA에러'로 지치지 마세요.<br />
                    끝공의 핵심 무기는 바로 <b>웹 브라우저 하나면 즉시 구동되는 완벽한 클라우드 Jupyter 샌드박스</b>입니다.
                </p>

                <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-[#333] shadow-2xl max-w-5xl w-full text-white font-mono text-lg flex flex-col text-left">
                    <div className="text-[#D4D4D4] mb-6 border-b border-[#333] pb-4">
                        Terminal / Console — Powered by 끝공 Serverless
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400">root@kkeutgong:~$</span>
                        <span className="text-white">python -m venv aice_env</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 opacity-30">
                        <span className="text-gray-400">↳ 로컬 환경 충돌 방지 세팅 중...</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400">root@kkeutgong:~$</span>
                        <span className="text-white">pip install pandas scikit-learn jupyter</span>
                    </div>
                    <div className="flex items-center gap-2 mb-6 opacity-30">
                        <span className="text-gray-400">↳ 의존성 설치 중...</span>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm rounded-xl border-2 border-red-500 flex items-center justify-center text-red-200 font-bold text-2xl z-10 px-8 py-10 transform -rotate-2">
                            이 짓을 하다가 3일을 버립니다.
                        </div>
                    </div>

                    <div className="bg-primary/20 text-primary-foreground p-4 rounded-xl mt-12 border border-primary/30 flex items-center gap-2 font-sans font-bold shadow-[0_0_15px_rgba(115,83,234,0.3)]">
                        <CheckCircle2 className="w-5 h-5" /> 크롬/사파리로 끝공 URL만 치면 모든 백엔드 환경이 1초 만에 구성됩니다.
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#F3F4F6]',
    },

    // 20. Bandit 알고리즘 알림
    {
        id: 'g-service-04',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24">
                <div className="max-w-5xl w-full">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 font-bold text-sm px-4 py-2 rounded-full mb-6 mx-auto md:mx-0">
                                <Bell className="w-4 h-4" />
                                Service 04
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground leading-tight">
                                Bandit 알고리즘<br />
                                <span className="text-amber-500">스마트 알림</span>
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                사용자의 학습 습관 데이터를 기반으로, 최적의 학습 시간과
                                복습 타이밍을 AI가 자동으로 알려줍니다.
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col gap-4 max-w-sm w-full mx-auto">
                            {[
                                { time: '오전 9:00', msg: '어제 틀린 DataFrame 문제 3개, 지금 복습하면 효과적이에요!' },
                                { time: '오후 2:30', msg: '이번 주 학습 목표의 60% 달성! 오늘 1세션만 더 하면 목표 달성 💪' },
                                { time: '오후 8:00', msg: 'D-5! 모의고사를 풀어볼 시간이에요. 지금 도전해보세요.' },
                            ].map((n, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-border shadow-lg hover:-translate-y-1 transition-transform text-left">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Bell className="w-4 h-4 text-amber-500" />
                                        <span className="text-xs font-bold text-muted-foreground">{n.time}</span>
                                    </div>
                                    <p className="text-sm text-foreground font-medium leading-relaxed">{n.msg}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },
]

export { slidesGeneralPart2 }
