// Part 1: Cover, Overview (2장), Background (2장) — 슬라이드 1~5

const slidesGeneralPart1 = [
    // 1. Cover
    {
        id: 'g-cover',
        content: (
            <div className="flex flex-col items-center justify-center h-full w-full text-white px-4 text-center z-10 relative">
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                                width: `${20 + i * 15}px`,
                                height: `${20 + i * 15}px`,
                                top: `${10 + i * 14}%`,
                                left: `${5 + i * 16}%`,
                                animation: `float ${4 + i}s ease-in-out infinite alternate`,
                            }}
                        />
                    ))}
                </div>
                <div className="inline-block px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mb-8 text-sm font-semibold tracking-widest uppercase">
                    AI 자격증 학습 플랫폼
                </div>
                <h1 className="text-7xl md:text-[120px] font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50">
                    끝공
                </h1>
                <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-white/90 max-w-3xl leading-relaxed">
                    기출문제 PDF만 올리면,<br />
                    나만의 자격증 학습이 시작됩니다.
                </h2>
                <div className="flex items-center gap-3 mt-4 text-white/50 text-sm font-medium">
                    <span>끝공 서비스 제안서</span>
                    <span>·</span>
                    <span>2025</span>
                </div>
            </div>
        ),
        background: 'elice-mesh-gradient',
    },

    // 2. Overview — 문제 정의
    {
        id: 'g-overview-problem',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Overview
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-10 text-foreground text-center leading-tight">
                    자격증 공부,<br />막막하지 않으세요?
                </h2>
                <div className="max-w-4xl bg-white p-10 rounded-3xl border border-border shadow-xl">
                    <div className="space-y-6 text-xl leading-relaxed text-muted-foreground">
                        <p>
                            자격증 공부를 시작하려고 하면 무엇부터 해야 할지 몰라 막막해지기 마련입니다.
                        </p>
                        <p>
                            교재를 사기에는 <span className="font-bold text-foreground">비용이 부담</span>스럽고,
                            인터넷에서 찾은 자료나 강의는 <span className="font-bold text-foreground">체계가 부족</span>하거나
                            나에게 맞지 않아 쉽게 손이 가지 않습니다.
                        </p>
                        <p className="font-bold text-foreground text-2xl pt-4 border-t border-border">
                            결국 포기하는 이유는 의지 부족이 아니라,<br />
                            <span className="text-primary">처음 방향을 잡아 주는 기준과 흐름</span>이 부족하기 때문입니다.
                        </p>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },

    // 3. Overview — 타깃 전환 스토리
    {
        id: 'g-overview-pivot',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 bg-[#191F28] text-white break-keep">
                <h3 className="text-primary font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    The Pivot
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-center leading-tight max-w-5xl">
                    처음엔 <span className="text-primary">"수험생"</span>을 타깃으로 한<br />
                    아이디어였습니다.
                </h2>
                <div className="max-w-4xl w-full space-y-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-3xl">
                        <p className="text-xl text-white/80 leading-relaxed mb-6 text-center">
                            자료를 올리면 커리큘럼을 짜주고, 문제를 만들어주는 플랫폼.
                            <br />하지만 <span className="font-bold text-white">100점을 목표</span>로,
                            <span className="font-bold text-white"> 하루 10시간</span>씩 공부하는 사람이 아니었습니다.
                        </p>
                        <div className="bg-primary/20 border border-primary/30 p-6 rounded-2xl">
                            <p className="text-2xl font-black text-center text-white">
                                그래서 깨달았습니다.<br />
                                이 서비스의 <span className="text-primary">타깃</span>과 제 <span className="text-primary">경험</span>이 맞지 않는다는 걸요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#191F28]',
    },

    // 4. Background — 합격률 데이터
    {
        id: 'g-bg-passrate',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
                <h3 className="text-destructive font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Background
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight text-center">
                    1년에 2,317,887명 도전,<br />
                    합격은 <span className="text-destructive">750,499명</span>뿐.
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed text-center mb-12">
                    3명 중 2명은 실패합니다. 국가기술자격 평균 합격률은
                    <span className="font-bold text-foreground"> 약 34%</span>에 불과합니다.
                </p>
                <div className="flex flex-col md:flex-row gap-16 items-center max-w-5xl w-full">
                    <div className="flex-1 bg-white p-8 rounded-3xl border border-border shadow-xl w-full">
                        <h4 className="font-bold text-xl mb-6 text-center">연도별 합격률 추이</h4>
                        <div className="space-y-4">
                            {[
                                { y: '2019년', r: '35.00%', v: 35, c: '773,724 / 2,210,475' },
                                { y: '2020년', r: '34.73%', v: 34.7, c: '715,901 / 2,061,474' },
                                { y: '2023년', r: '33.73%', v: 33.7, c: '839,762 / 2,489,336' },
                                { y: '2024년', r: '35.28%', v: 35.3, c: '739,098 / 2,094,718' },
                                { y: '2025년', r: '32.38%', v: 32.4, c: '750,499 / 2,317,887' },
                            ].map((d, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm font-bold mb-1">
                                        <span className="text-foreground">{d.y}</span>
                                        <span className="text-muted-foreground text-xs">{d.c}</span>
                                        <span className="text-destructive">{d.r}</span>
                                    </div>
                                    <div className="w-full bg-muted h-5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-700"
                                            style={{
                                                width: `${d.v}%`,
                                                background: 'linear-gradient(90deg, #EF4444, #F87171)',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-white',
    },

    // 5. Background — 취업 도움
    {
        id: 'g-bg-employment',
        content: (
            <div className="flex flex-col justify-center items-center h-full w-full px-12 md:px-24 break-keep">
                <h3 className="text-success font-bold text-xl mb-4 tracking-widest uppercase text-center">
                    Employment Impact
                </h3>
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-foreground text-center leading-tight">
                    자격증이 정말<br />
                    <span className="text-[#00C471]">취업에 도움</span>이 될까?
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">
                    <div className="flex-1 bg-white p-10 rounded-3xl border border-border shadow-xl text-center">
                        <div className="text-6xl font-black text-[#00C471] mb-4">47.5%</div>
                        <p className="text-lg text-muted-foreground font-medium">
                            미취업 자격취득자 중<br />
                            <span className="font-bold text-foreground">1년 이내 취업 비율</span>
                        </p>
                    </div>
                    <div className="flex-1 bg-white p-10 rounded-3xl border border-border shadow-xl text-center">
                        <div className="text-6xl font-black text-primary mb-4">+7.9%p</div>
                        <p className="text-lg text-muted-foreground font-medium">
                            자격 취득자 vs 미취득자<br />
                            <span className="font-bold text-foreground">취업률 차이</span>
                        </p>
                    </div>
                    <div className="flex-1 bg-[#191F28] p-10 rounded-3xl text-white text-center shadow-xl">
                        <div className="text-5xl font-black mb-4">74만명</div>
                        <p className="text-lg text-white/70 font-medium">
                            2023년 국가기술자격<br />
                            <span className="font-bold text-white">취득자 수</span>
                        </p>
                        <p className="text-xs text-white/40 mt-4">출처: 고용노동부</p>
                    </div>
                </div>
            </div>
        ),
        background: 'bg-[#FAFAFA]',
    },
]

export { slidesGeneralPart1 }
