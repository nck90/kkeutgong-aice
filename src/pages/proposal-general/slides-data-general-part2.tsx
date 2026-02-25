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
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
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
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 bg-[#191F28] text-white break-keep">
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
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
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

    // 9. Feature 1 — 14일 맞춤 커리큘럼
    {
        id: 'g-feat-1',
        content: (
            <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto break-keep">
                <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
                    {/* Left Text */}
                    <div className="flex-1 w-full text-left">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-sm px-4 py-2 rounded-full mb-6">
                            <Calendar className="w-4 h-4" />
                            Feature 01. 맞춤형 커리큘럼
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-[1.3]">
                            "시험이 코앞인데,<br />무엇부터 해야 하죠?"
                        </h2>
                        <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
                            <p>
                                더 이상 엑셀로 단계를 쪼개며 계획을 짜느라 <b>시간을 낭비하지 마세요.</b><br />
                                사용자의 목표 트랙과 시험일(D-Day)을 설정하면 시스템이 지시하는 가이드를 그대로 따르기만 하면 됩니다.
                            </p>
                            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                                <p className="text-foreground font-bold">
                                    업로드된 기출문제를 분석하여 가장 시급한 파트부터 타격하는 <br /><span className="text-primary tracking-tight">가장 완벽한 14일 패스트트랙 플랜</span>을 AI가 자동 분배합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Right Visual */}
                    <div className="flex-[1.2] w-full max-w-3xl">
                        <ImageMockup src="/pitch-assets/plan.png" alt="Plan Weekly Calendar" className="w-full h-[600px] object-cover object-left-top" />
                    </div>
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 10. Feature 2 — AI 맞춤 개념장
    {
        id: 'g-feat-2',
        content: (
            <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto break-keep">
                <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
                    {/* Left Text */}
                    <div className="flex-1 w-full text-left">
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 font-bold text-sm px-4 py-2 rounded-full mb-6">
                            <BookOpen className="w-4 h-4" />
                            Feature 02. 맞춤 요약 개념장
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-[1.3]">
                            두꺼운 수험서 1회독?<br />시험에 나오는 요약만 봅니다.
                        </h2>
                        <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
                            <p>
                                교재 전체를 다 볼 필요가 없습니다.<br />
                                마치 강사가 옆에서 쪽집게 과외를 해주듯, <b>PDF 기출문제에서 추출된 핵심 개념</b>만 모바일과 PC 최적화 뷰어로 제공합니다.
                            </p>
                        </div>
                    </div>
                    {/* Right Visual */}
                    <div className="flex-[1.2] w-full max-w-3xl">
                        <ImageMockup src="/pitch-assets/textbook.png" alt="Concept Textbook" className="w-full h-[600px] object-cover object-left-top" />
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 11. Feature 3 — 인터랙티브 코딩 실습
    {
        id: 'g-feat-3',
        content: (
            <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto break-keep">
                <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
                    {/* Left Text */}
                    <div className="flex-1 w-full text-left">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 font-bold text-sm px-4 py-2 rounded-full mb-6">
                            <Code className="w-4 h-4" />
                            Feature 03. 인터랙티브 코딩 실습
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-[1.3]">
                            눈으로 읽은 코드,<br />그 자리에서 바로 손으로 쳐보세요.
                        </h2>
                        <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
                            <p>
                                방대하고 무거운 이론서 회독은 끝났습니다. 이제 <b>직접 손이 기억할 차례입니다.</b><br />
                                요약 개념 뷰어 바로 옆에 <b>실전 웹 기반 Jupyter 터미널 커널</b>이 브라우저에서 즉각 열립니다.
                            </p>
                            <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20 text-green-900 font-bold text-left mt-4 break-keep">
                                개념 학습(Textbook) ➔ 코드 실습(Labs) ➔ 메타인지 진단(Diagnostic)으로<br />
                                <b>끊김없이 이어지는 완전한 AI 러닝 통합 파이프라인.</b>
                            </div>
                        </div>
                    </div>
                    {/* Right Visual */}
                    <div className="flex-[1.2] w-full max-w-3xl">
                        <ImageMockup src="/pitch-assets/labs.png" alt="Interactive Coding Labs" className="w-full h-[600px] object-cover object-left-top" />
                    </div>
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 12. Feature 4 — 약점 진단 & 대시보드
    {
        id: 'g-feat-4',
        content: (
            <div className="flex flex-col justify-center h-full w-full px-12 md:px-24 max-w-[1700px] mx-auto break-keep">
                <div className="flex flex-col lg:flex-row gap-16 items-center w-full">
                    {/* Left Text */}
                    <div className="flex-1 w-full text-left">
                        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 font-bold text-sm px-4 py-2 rounded-full mb-6">
                            <BrainCircuit className="w-4 h-4" />
                            Feature 04. 약점 진단 & 대시보드
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-[1.3]">
                            "내 실력이 어느 정도인지<br />데이터로 객관화합니다"
                        </h2>
                        <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-[1.8] max-w-2xl">
                            <p>
                                학습 시작 전 <b>사전 진단고사(Diagnostic)</b>를 통해 정확한 내 위치를 파악하고,
                                매일 접속하는 <b>대시보드(Dashboard)</b>에서 진도율과 나의 취약 파트를 수치화된 리포트로 관리받습니다.
                            </p>
                            <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 text-amber-900 font-bold flex items-start gap-4">
                                <BarChart3 className="w-8 h-8 text-amber-600 shrink-0" />
                                <div>
                                    감으로 하는 공부는 필패합니다.<br />
                                    코딩 정답률 데이터를 기반으로 커리큘럼을 실시간으로 우회합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Visual */}
                    <div className="flex-[1.2] w-full max-w-3xl">
                        <ImageMockup src="/pitch-assets/diagnostic.png" alt="Diagnostic Dashboard" className="w-full h-[600px] object-cover object-left-top" />
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 19. Zero Configuration — 끝공의 핵심 기술 우위
    {
        id: 'g-zero-config',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
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
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
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
