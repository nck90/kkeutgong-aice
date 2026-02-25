import { Play, CheckCircle2, BookOpen, Code, BrainCircuit, Activity, BarChart2 } from 'lucide-react';

export function TextbookMockup({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-border ring-1 ring-black/5 ${className}`}>
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-border/50 bg-[#FDFDFD]">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                        개념 학습
                    </div>
                    <h2 className="text-xl font-bold text-foreground">1. 데이터 전처리 기초</h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                </div>
            </div>
            {/* Content */}
            <div className="p-10 flex-1 overflow-y-auto">
                <h1 className="text-4xl font-black text-foreground mb-8">결측치(Missing Value) 처리</h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    데이터 분석 실무에서 가장 먼저 마주하는 문제는 바로 데이터의 빈칸, 즉 결측치입니다. 결측치를 처리하는 방법은 크게 <b>삭제(Drop)</b>와 <b>대체(Imputation)</b>로 나눌 수 있습니다.
                </p>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. 결측치 확인하기</h2>
                <div className="bg-[#191F28] p-6 rounded-xl mb-8 font-mono text-sm border-l-4 border-l-green-500 shadow-inner">
                    <span className="text-green-400">df</span>.<span className="text-blue-300">isnull</span>().<span className="text-blue-300">sum</span>()
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    가장 간단히 시각적으로 데이터의 결측 빈도를 파악하려면 위 함수를 연속적으로 사용하세요.
                </p>
            </div>
        </div>
    )
}

export function LabsIDEMockup({ className = "" }: { className?: string }) {
    return (
        <div className={`flex w-full bg-[#191F28] rounded-2xl shadow-2xl overflow-hidden border border-[#2a2f3a] text-[#E5E5E5] font-mono ring-1 ring-white/10 ${className}`}>
            {/* Sidebar mock */}
            <div className="w-16 bg-[#12161A] border-r border-[#2a2f3a] flex flex-col items-center py-6 gap-8">
                <Code className="w-6 h-6 text-primary" />
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <div className="w-4 h-4 text-white/40 border-2 border-current rounded-sm"></div>
                </div>
            </div>
            {/* Main Editor */}
            <div className="flex-1 flex flex-col">
                {/* Editor Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-[#2a2f3a] bg-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="text-sm text-white/50 font-sans ml-4 bg-[#12161A] px-4 py-1.5 rounded-md border border-[#2a2f3a]">main.py</div>
                    </div>
                    <div className="h-9 px-5 bg-primary text-white rounded-lg flex items-center gap-2 text-sm font-bold shadow-[0_0_15px_rgba(115,83,234,0.3)] cursor-pointer hover:bg-primary/90 transition-colors">
                        <Play className="w-4 h-4 fill-current" /> Submit & Grade
                    </div>
                </div>
                {/* Editor Content */}
                <div className="p-8 flex-1 text-[15px] leading-loose">
                    <div className="flex"><span className="text-white/30 w-10 text-right pr-4 select-none">1</span><span className="text-pink-400">import</span> pandas <span className="text-pink-400">as</span> pd</div>
                    <div className="flex"><span className="text-white/30 w-10 text-right pr-4 select-none">2</span></div>
                    <div className="flex"><span className="text-white/30 w-10 text-right pr-4 select-none">3</span><span className="text-[#6A737D]"># 1. 데이터를 불러옵니다.</span></div>
                    <div className="flex"><span className="text-white/30 w-10 text-right pr-4 select-none">4</span>df = pd.<span className="text-blue-300">read_csv</span>(<span className="text-amber-300">'dataset.csv'</span>)</div>
                    <div className="flex"><span className="text-white/30 w-10 text-right pr-4 select-none">5</span></div>
                    <div className="flex"><span className="text-white/30 w-10 text-right pr-4 select-none">6</span><span className="text-[#6A737D]"># 2. 'Age' 컬럼의 결측치를 확인합니다.</span></div>
                    <div className="flex bg-white/5 border-l-2 border-primary -ml-8 pl-8"><span className="text-white/30 w-10 text-right pr-4 select-none">7</span><span className="text-amber-100">print</span>(df[<span className="text-amber-300">'Age'</span>].<span className="text-blue-300">isnull</span>().<span className="text-blue-300">sum</span>())<span className="animate-pulse ml-1 inline-block w-2 bg-white/80 h-4 align-middle"></span></div>
                </div>
                {/* Console */}
                <div className="h-40 border-t border-[#2a2f3a] bg-[#12161A] p-6 font-mono text-sm overflow-y-auto relative shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)]">
                    <div className="text-white/30 text-xs mb-3 font-semibold tracking-widest uppercase">Console Output</div>
                    <div className="text-gray-300">&gt; 42</div>
                </div>
            </div>
        </div>
    )
}

export function PlanCalendarMockup({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-border p-8 font-sans ${className}`}>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-black text-foreground">Week 1. 파이썬과 데이터 분석 기초</h2>
                    <p className="text-muted-foreground mt-2 text-lg">D-14 집중 패스트트랙</p>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-4 text-sm flex-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex gap-2 flex-col h-full min-h-[160px]">
                        <div className="text-center font-bold text-muted-foreground pb-3 border-b border-border text-base uppercase tracking-wider">{day}</div>
                        <div className={`rounded-xl p-4 h-full border ${i === 2 ? 'bg-primary border-primary shadow-[0_10px_30px_rgba(115,83,234,0.3)] transform scale-105 z-10' : i < 3 ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-border/50'} flex flex-col gap-3 transition-all`}>
                            <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
                                <span className={i === 2 ? 'text-white' : ''}>Day {i + 1}</span>
                                {i < 2 && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                {i === 2 && <Activity className="w-5 h-5 text-white animate-pulse" />}
                            </div>
                            <div className={`font-bold mt-1 text-base leading-snug ${i === 2 ? 'text-white text-lg' : i < 2 ? 'text-foreground' : 'text-foreground/40'}`}>
                                {i === 0 ? '환경 설정 & 기초' :
                                    i === 1 ? 'Pandas 로드' :
                                        i === 2 ? '결측치 전처리 (오늘)' :
                                            i === 3 ? 'Matplotlib' :
                                                i === 4 ? '분석 실습' :
                                                    i === 5 ? 'Week 1 리뷰' : '휴식'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function DiagnosticMockup({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-border p-8 font-sans ${className}`}>
            <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-6">
                <div className="flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-2xl">
                        <BrainCircuit className="w-8 h-8 text-amber-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-foreground">사전 진단 리포트</h2>
                        <p className="text-muted-foreground">AICE Associate 트랙 예상 합격률</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-5xl font-black text-amber-500">42<span className="text-2xl">%</span></div>
                    <div className="text-sm font-bold text-muted-foreground text-center">현재 합격 위험군</div>
                </div>
            </div>

            <h3 className="font-bold text-xl mb-6">주요 파트별 역량 분석</h3>
            <div className="space-y-6">
                {[
                    { name: 'Python 문법', score: 85, color: 'bg-green-500' },
                    { name: 'Pandas 핸들링', score: 60, color: 'bg-yellow-500' },
                    { name: 'Scikit-Learn 모델링', score: 20, color: 'bg-red-500' }, // Weak point
                ].map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-foreground text-lg">{item.name}</span>
                            <span className="font-bold text-muted-foreground">{item.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-red-50 p-6 rounded-2xl border border-red-100 flex items-start gap-4">
                <BarChart2 className="w-8 h-8 text-red-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-red-900 text-lg mb-2">Scikit-Learn 집중 공략 필요</h4>
                    <p className="text-red-800/80 leading-relaxed">회귀/분류 모델 생성 및 하이퍼파라미터 튜닝 파트에 대한 경험이 전무합니다. 14일 플랜 중 <b>Day 7 ~ Day 11</b> 일정을 Scikit-Learn 특별 보강 과정으로 자동 편성했습니다.</p>
                </div>
            </div>
        </div>
    )
}

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
